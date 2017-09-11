# Configure Rails Environment
ENV["RAILS_ENV"] ||= "test"


support_path = File.expand_path("../support/*.rb", __FILE__)
Dir.glob(support_path).each do |f|
  require(f)
end

require File.expand_path("../../config/environment.rb", __FILE__)
require "rails/test_help"
require "pathname"
require "minitest/reporters"
require "minitest/rails/capybara"
require "minitest/fail_fast"
require "selenium-webdriver"
require "capybara"
require "database_cleaner"
require "capybara/poltergeist"

DatabaseCleaner.strategy = :truncation


#screenshots
# Capybara::Screenshot.register_driver(:chrome) do |driver, path|
#   driver.browser.save_screenshot(path)
# end
# Capybara::Screenshot.autosave_on_failure = true #not fucking working..

#Minitest::Reporters.use!

#ActionController::Base.asset_host = "http://myapp.dev"


Capybara.app = Rails.application
Capybara.register_driver :poltergeist_debug do |app|
  poltergeist_options = {
    # page.driver.debug` will cause Poltergeist to open a browser window
    # inspector: true,
    # debug: true,
    js_errors: false,
    js: true,
  }
  Capybara::Poltergeist::Driver.new(app, poltergeist_options)
end

Capybara.register_driver :selenium_firefox do |app|
  options = {
  }
  Capybara::Selenium::Driver.new(app, options)
end 


Rails.backtrace_cleaner.remove_silencers!

def reset_transformer
  SprocketsHelpers.clear_sprockets_cache
  React::JSX.transformer_class = React::JSX::DEFAULT_TRANSFORMER
  React::JSX.transform_options = {}
  React::JSX.transformer = nil
end

# Rails 3.2's version of MiniTest does not have `capture_io` defined. For
# consistency across multiple versions we've defined that method here.
#
def capture_io
  require 'stringio'

  orig_stdout, orig_stderr         = $stdout, $stderr
  captured_stdout, captured_stderr = StringIO.new, StringIO.new
  $stdout, $stderr                 = captured_stdout, captured_stderr

  yield

  return captured_stdout.string, captured_stderr.string
ensure
  $stdout = orig_stdout
  $stderr = orig_stderr
end

# Load support files
Dir["#{File.dirname(__FILE__)}/support/**/*.rb"].each { |f| require f }

# Load fixtures from the engine
class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  #clean database
  def setup
    DatabaseCleaner.start
    Capybara.javascript_driver = :selenium_firefox
    Capybara.current_driver = Capybara.javascript_driver
    super
  end

  def teardown
    DatabaseCleaner.clean
    Capybara.reset_sessions!
    super
  end

  # Add more helper methods to be used by all tests here...
end

if ActiveSupport::TestCase.respond_to?(:test_order=)
  ActiveSupport::TestCase.test_order = :random
end

def wait_for_turbolinks_to_be_available
  sleep(1)
end

# Different processors may generate slightly different outputs,
# as some version inserts an extra "\n" at the beginning.
# Because appraisal is used, multiple versions of coffee-script are treated
# together. Remove all spaces to make test pass.
def assert_compiled_javascript_matches(javascript, expectation)
  assert_equal expectation.gsub(/\s/, ''), javascript.gsub(/\s/, '')
end

def assert_compiled_javascript_includes(javascript, expected_part)
  assert_includes javascript.gsub(/\s/, ''), expected_part.gsub(/\s/, '')
end

def when_stateful_js_context_available
  if defined?(V8) || defined?(MiniRacer)
    yield
  end
end

def authorized_dashboard
  post "/authorize", params: { username: 'dev_user', password: 'dev_password' }
end

module ParamsHelper
  # Normalize params for Rails 5.1+
  def query_params(params)
    if Rails::VERSION::MAJOR > 4
      {params: params}
    else
      params
    end
  end
end
