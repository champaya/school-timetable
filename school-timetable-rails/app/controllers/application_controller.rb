# frozen_string_literal: true

# ApplicationController
class ApplicationController < ActionController::API
  # devise_token_authのメッセージを日本語化
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action do
    I18n.locale = :ja
  end
end
