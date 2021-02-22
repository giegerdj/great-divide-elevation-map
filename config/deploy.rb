# config valid for current version and patch releases of Capistrano
lock "~> 3.11.2"
set :application, "great-divide-elevation-map"
set :repo_url, "git@github.com:giegerdj/great-divide-elevation-map.git"

set :ssh_options, {
    forward_agent: true
}

set :keep_releases, 5


append :linked_files,
        ".env"

append :linked_dirs,
        "storage",
        "bootstrap/cache"

after 'deploy:published', 'deploy:restart'

# this happens before the 'current' symlink is changed to the newest release
before "deploy:symlink:release", "laravel:file_permissions"
before "deploy:symlink:release", "sys:composer_install"
before "deploy:symlink:release", "ep:assets"

# this happens after the 'current' symlink is changed to the proper release
# in a normal deploy AND rollback
after "deploy:published", "laravel:view_clear"
after "deploy:published", "laravel:route_cache"
after "deploy:published", "laravel:config_cache"
after "deploy:published", "sys:restart_php_fpm"


namespace :ep do
    desc "setup custom files"
    task :setup do
        on roles(:app, :web, :worker) do

            execute "mkdir -p #{shared_path}/bootstrap/cache/"
            execute "mkdir -p #{shared_path}/storage/debugbar/"
            execute "mkdir -p #{shared_path}/storage/app/"
            execute "mkdir -p #{shared_path}/storage/framework/cache/data/"
            execute "mkdir -p #{shared_path}/storage/framework/sessions/"
            execute "mkdir -p #{shared_path}/storage/framework/views/"
            execute "mkdir -p #{shared_path}/storage/medialibrary/"
            execute "mkdir -p #{shared_path}/storage/logs/"

            execute "mkdir -p #{shared_path}/public/"
        end
    end

    desc "clear response cache"
    task :responsecache_clear do
        on roles(:worker) do
            execute "php #{current_path}/artisan responsecache:clear"
        end
    end

    desc "Compile web assets locally and send to the server"
    task :assets do
        branch = fetch(:branch)
        system("git checkout #{branch} && npm run production") or raise "Could not compile static assets"
        on roles(:app, :web, :worker) do
           upload! "public/mix-manifest.json", "#{release_path}/public/"
           upload! "public/assets/build", "#{release_path}/public/assets/", recursive: true
        end
    end

#     desc "Run database migrations"
#     task :migrate do
#         on roles(:db) do
#             execute "if $(php #{release_path}/artisan migrate:status | grep --quiet 'No migrations found'); then php #{release_path}/artisan migrate:install; fi"
#             execute "php #{release_path}/artisan migrate --force"
#         end
#     end

end

namespace :laravel do

    desc "Restart Queue"
    task :horizon_terminate do
        on roles(:worker) do
            execute "php #{current_path}/artisan horizon:terminate"
        end
    end

    desc "Restart Queue"
    task :restart_queue do
        on roles(:worker) do
            execute "php #{current_path}/artisan queue:restart"
        end
    end

    desc "File Permissions"
    task :file_permissions do
        on roles(:app, :web, :worker) do
            execute "find -L #{release_path}/public/ -type d -exec chmod 750 {} \\;"
            execute "find -L #{release_path}/public/ -type f -exec chmod 640 {} \\;"
        end
    end


    desc "Rollback the last database migration"
    task :migrate_rollback do
        on roles(:db) do
            execute "php #{current_path}/artisan migrate:rollback"
        end
    end

    desc "Show the status of each migration"
    task :migrate_status do
        on roles(:db) do
            execute "php #{current_path}/artisan migrate:status"
        end
    end

    desc "Remove the route cache file"
    task :route_clear do
        on roles(:app, :web, :worker) do
            execute "php #{current_path}/artisan route:clear"
        end
    end

    desc "Create a route cache file for faster route registration"
    task :route_cache do
        on roles(:app, :web, :worker) do
            execute "php #{current_path}/artisan route:cache --quiet"
        end
    end

    desc "Put the application into maintenance mode"
    task :down do
        on roles(:app, :web, :worker) do
            execute "php #{current_path}/artisan down"
        end
    end

    desc "Bring the application out of maintenance mode"
    task :up do
        on roles(:app, :web, :worker) do
            execute "php #{current_path}/artisan up"
        end
    end

    desc "Clear all compiled view files"
    task :view_clear do
        on roles(:app, :web) do
            execute "php #{current_path}/artisan view:clear"
        end
    end

    desc "Remove the configuration cache file"
    task :config_clear do
        on roles(:app, :web, :worker) do
            execute "php #{current_path}/artisan config:clear"
        end
    end

    desc "Create a cache file for faster configuration loading"
    task :config_cache do
        on roles(:app, :web, :worker) do
            execute "php #{current_path}/artisan config:clear"
            execute "php #{current_path}/artisan config:cache"
        end
    end

    desc "Optimize the framework for better performance"
    task :optimize do
        on roles(:app, :web, :worker) do
            execute "php #{current_path}/artisan clear-compiled"
            execute "php #{current_path}/artisan optimize"
        end
    end

    desc "Remove the compiled class file"
    task :clear_compiled do
        on roles(:app, :web, :worker) do
            execute "php #{current_path}/artisan clear-compiled"
        end
    end
end

namespace :sys do

    desc "Composer install"
    task :composer_install do
        on roles(:app, :web, :worker) do
            execute "composer --working-dir=#{release_path} install --no-dev --quiet --prefer-dist --optimize-autoloader"
        end
    end

    desc "Reload php7.3-fpm"
    task :restart_php_fpm do
        on roles(:app, :web, :worker) do
            execute "sudo systemctl restart php7.3-fpm.service"
        end
    end
end

