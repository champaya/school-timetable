# frozen_string_literal: true

module Api
  module V1
    module Auth
      # registrasionリソースクラス
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        private

        # サインアップ時のストロングパラメータ
        def sign_up_params
          params.permit(:email, :password, :password_confirmation, :name)
        end
      end
    end
  end
end
