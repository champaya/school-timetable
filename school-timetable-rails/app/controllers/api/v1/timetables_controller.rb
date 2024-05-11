# frozen_string_literal: true

module Api
  module V1
    class TimetablesController < ApplicationController
      # 処理前にログインユーザのチェック
      before_action :authenticate_api_v1_user!

      # @todo rails標準の機能でSQLを代替できないか検討
      # GET /api/v1/timetables/:id 対象ユーザの時間割を取得する
      def show
        timetable = Timetable.select('timetables.day_of_week, timetables.time, timetables.period, lectures.lecture_id, lectures.lecture_name, lectures.credit_count, teachers.teacher_name ')
                             .joins('INNER JOIN lectures ON timetables.lecture_id = lectures.lecture_id INNER JOIN teachers ON lectures.teacher_id = teachers.teacher_id ')
                             .where(
                               'timetables.user_id = ?', params[:id]
                             )
        render json: { status: 'SUCCESS', message: 'Loaded timetables', data: timetable }, status: :ok
      end

      # POST /api/v1/timetables 対象ユーザに授業を登録する
      def create
        args = ['insert timetables (user_id,	day_of_week, `time`, period, lecture_id, created_at, updated_at)
                 select ?, lectures.day_of_week, lectures.`time`, lectures.period, lectures.lecture_id , lectures.created_at, lectures.updated_at from lectures where lecture_id = ?',
                params[:user_id], params[:lecture_id]]
        sql = ActiveRecord::Base.send(:sanitize_sql_array, args)
        ActiveRecord::Base.connection.execute(sql)
      end

      # DELETE /api/v1/timetables/:id 対象ユーザの対象授業を削除する
      def destroy
        args = ['delete from timetables where user_id = ? and lecture_id = ?',
                params[:id], params[:lecture_id]]
        sql = ActiveRecord::Base.send(:sanitize_sql_array, args)
        ActiveRecord::Base.connection.execute(sql)
      end
    end
  end
end
