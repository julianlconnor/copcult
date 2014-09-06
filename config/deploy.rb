set :stages, %w(qa staging production)
set :application, "expressweb"

require 'capistrano/ext/multistage'
require 'rubygems'

load 'config/deploy/include/supervisor_managed_app'

### Load different apps to deploy as tasks
### (NB: stage names are reserved for #multistage plugin)
set :application_tasks, []
Dir[File.expand_path('../deploy/*.rb', __FILE__)].each do |file|
  app = File.basename(file, ".rb")
  unless stages.include?(app)
    application_tasks << app
    task app do
      load "config/deploy/#{app}"
      # Roles don't always completely stop the wrong tasks from running, so the
      # following is a manual sanity check that we won't e.g. run the test
      # environment deploy in production
      abort "#{app} tasks are only allowed in stages: [#{allowed_stages.join(", ")}]" unless allowed_stages.include?(stage.to_s)
    end
  end
end


# Capistrano configuration options
set :deploy_via, :copy
set :scm, 'git'
set :git_enable_submodules, true
set :repository, "git@bitbucket.com:muffs/arbiter.git"
set :copy_cache, '/tmp/arbiter'
set :copy_exclude, [".git", ".gitignore", ".gitmodules", ".DS_Store"] # We may want to exclude node_modules
set :user, `cat ./.CAPUSER`.chomp
set :use_sudo, true
set(:deploy_to) { "/app/#{application}" }

# Variables we've introduced
set :assets_cache, '/tmp/assets_cache'
set :allowed_stages, []

# set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

# if you want to clean up old releases on each deploy uncomment this:
after "deploy:restart", "deploy:cleanup"

set :build_script, "npm install && ./node_modules/.bin/bower install && grunt build"
