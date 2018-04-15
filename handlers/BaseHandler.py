# -*- coding:utf-8 -*-

from tornado.web import RequestHandler


class BaseHandler(RequestHandler):
    """
    这个Handler，主要是所有Hnadler的父类
    完成所有Handler中公共的功能
    """

    def query(self,sql,args):
        cursor = self.db.cursor()
        rows=cursor.execute(sql,args)
        user_data = cursor.fetchall()
        return rows,user_data

    def add_object(self, sql, args):
        rows = self.db.cursor().execute(sql, args)
        self.db.commit()
        return rows

    def del_object(self,sql,args):
        rows = self.db.cursor().execute(sql,args)
        self.db.commit()
        return rows

    @property
    def db(self):
        return self.application.db

    @property
    def redis(self):
        return self.application.redis

    def initialize(self):
        pass

    def prepare(self):
        pass

    def get(self, *args, **kwargs):
        pass

    def post(self, *args, **kwargs):
        pass

    def on_finish(self):
        pass

    def write_error(self, status_code, **kwargs):
        pass

    def set_default_headers(self):
        pass
