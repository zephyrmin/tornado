# -*- coding:utf-8 -*-


class goods(object):
    """
    用于封装用户数据的类型
    """
    __slots__ = ["__id", "__brand","__productitle","__price","__color","__size","__proimg","__prodata","__brandstory","__brandimg","__meiciid"]

    def __init__(self,args):
        # print args
        # self.__id = args[0][0]
        # self.__brand = args[0][1]
        # self.__productitle = args[0][2]
        # self.__price = args[0][3]
        # self.__color = args[0][4]
        # self.__size = args[0][5]
        # self.__proimg = args[0][6]
        # self.__prodata = args[0][7]
        # self.__brandstory = args[0][8]
        # self.__brandimg = args[0][9]
        # self.__meiciid = args[0][10]

        self.__id = args[0]
        self.__brand = args[1]
        self.__productitle = args[2]
        self.__price = args[3]
        self.__color = args[4]
        self.__size = args[5]
        self.__proimg = args[6]
        self.__prodata = args[7]
        self.__brandstory = args[8]
        self.__brandimg = args[9]

        self.__meiciid = args[15]

    def get_id(self):
        return self.__id

    def set_id(self, id):
        self.__id = id

    def get_brand(self):
        return self.__brand

    def set_brand(self,brand):
        self.__brand=brand

    def get_productitle(self):
        return self.__productitle

    def set_productitle(self,productitle):
        self.__productitle=productitle

    def get_price(self):
        return self.__price

    def set_price(self, price):
        self.__price = price

    def get_color(self):
        return self.__color

    def set_color(self,color):
        self.__color=color

    def get_size(self):
        return self.__size

    def set_size(self,size):
        self.__size=size

    def get_proimg(self):
        return eval(self.__proimg)

    def set_proimg(self, proimg):
        self.__proimg = proimg

    def get_prodata(self):
        return eval(self.__prodata)

    def set_prodata(self,prodata):
        self.__prodata=prodata

    def get_brandstory(self):
        return self.__brandstory

    def set_brandstory(self,brandstory):
        self.__brandstory=brandstory

    def get_brandimg(self):
        return self.__brandimg

    def set_brandimg(self,brandimg):
        self.__brandimg=brandimg

    def get_meiciid(self):
        return self.__meiciid

    def set_meiciid(self,meiciid):
        self.__meiciid=meiciid

    def __repr__(self):
        return "{'id':"+str(self.__id)+",'brand':'"+str(self.__brand)+"','productitle':'"+str(self.__productitle)+"','price':'"+str(self.__price)+"','color':'"+str(self.__color)+"','size':'"+str(self.__size)+"','proimg':'"+str(self.__proimg)+"','prodata':'"+str(self.__prodata)+"','brandstory':'"+str(self.__brandstory)+"','brandimg':'"+str(self.__brandimg)+"','meiciid':'"+str(self.__meiciid)+"'}"

    # def __repr__(self):
    #     return "{'id':" + str(self.__id) + ",'brand':'" + str(self.__brand) + "','productitle':" + str(
    #         self.__productitle) + "}"