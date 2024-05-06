# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :set_user

      # @todo showが返すものは本来データであり、認証情報を返すつくりは適切ではない
      # 　　　認証ライブラリの導入とともに修正する
      # GET /api/v1/users/:id 対象ユーザの情報を取得して認証を行う
      def show
        result = auth_user?
        render json: { status: 'SUCCESS', message: 'Loaded users', data: { userInfo: @user, auth: result } }, status: :ok
      end

      # PATCH /api/v1/users/:id 対象ユーザのパスワードを更新する
      def update
        if @user.update(user_params)
          render json: { status: 'SUCCESS', message: 'Updated Password', data: @user }, status: :ok
        else
          render json: { status: 'ERROR', message: 'Password not updated', data: @user.errors },
                 status: :unprocessable_entity
        end
      end

      private

      # コールバックメソッド
      def set_user
        @user = User.find(params[:id])
      end

      # showメソッド用の認証処理
      def auth_user?
        @user.password == params[:password]
      end

      # updateメソッド用のストロングパラメータ
      def user_params
        params.permit(:password)
      end
    end
  end
end
