# frozen_string_literal: true

module Api
  module V1
    class TimetablesController < ApplicationController
      # @todo rails標準の機能でSQLを代替できないか検討
      # GET /api/v1/timetables/:id 対象ユーザの時間割を取得する
      def show
        @timetable = Timetable.select('timetables.day_of_week, timetables.time, timetables.period, lectures.lecture_name, lectures.credit_count, teachers.teacher_name ')
                              .joins('INNER JOIN lectures ON timetables.lecture_id = lectures.lecture_id INNER JOIN teachers ON lectures.teacher_id = teachers.teacher_id ')
                              .where(
                                'timetables.user_id = ?', params[:id]
                              )

        render json: { status: 'SUCCESS', message: 'Loaded timetables', data: @timetable }, status: :ok
      end
    end
  end
end
