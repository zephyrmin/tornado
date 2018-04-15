# -*- coding:utf-8 -*-

from . import BaseHandler
import re
import sys
sys.path.append("..")
from models import goodsDeta
import logging


class goodDetails(BaseHandler.BaseHandler):
    def get(self):
        open=self.get_argument('id')

        rows,all=self.query('select * from goods where id=%s',[open])
        aall=all[0]
        print all
        # print type(all),len(all)
        goodslist=goodsDeta.goods(aall)
        print goodslist
        # print type(goodslist)
        self.render('good_details.html',goodslist=goodslist)
