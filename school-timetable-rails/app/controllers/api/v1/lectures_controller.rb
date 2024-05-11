# frozen_string_literal: true

module Api
  module V1
    class LecturesController < ApplicationController
      # 処理前にログインユーザのチェック
      before_action :authenticate_api_v1_user!

      # GET /api/v1/lectures 授業一覧の情報を取得する
      def index
        @lectures = Lecture.select('lectures.*, teachers.teacher_name')
                           .joins('inner join teachers on lectures.teacher_id = teachers.teacher_id')
                           .order(lecture_id: :asc)
        render json: { status: 'SUCCESS', message: 'Loaded lectures', data: @lectures }, status: :ok
      end
    end
  end
end
