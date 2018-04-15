# -*- coding:utf-8 -*-
import pymysql
import sys
reload(sys)
sys.setdefaultencoding( "utf-8" )
#
# # 获取连接对象
from models import goodsDeta
db = pymysql.connect(host='127.0.0.1', user='root', password='960226',
                       database='meici', port=3306,
                       charset='utf8')
# # 获取执行工具
cur = db.cursor()
sql = 'select * from goods where id=8'
# # 执行,返回值。如果是增删改，返回受影响的行数，如果是查询，返回查询的行数
count = cur.execute(sql)
print('查询的结果有%s条数据'%count)
a=cur.fetchone()
b = goodsDeta.goods(a)
print type(b)
print b
b= eval(b.get_prodata())
print b['产　　地']
print len(b)
print type(b)

