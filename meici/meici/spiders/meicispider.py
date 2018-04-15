# -*- coding: utf-8 -*-
import scrapy
import re
import json
from meici import items
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor

class Meicispider(CrawlSpider):
    name = 'meici'
    allowed_domains = ['meici.com']
    start_urls = ['http://www.meici.com/product/detail/id/293612/saleid/154035.html',
                  'http://www.meici.com/product/detail/id/308693/saleid/160899.html',
                  'http://www.meici.com/product/detail/id/297674/saleid/155821.html',
                  'http://www.meici.com/product/detail/id/309106/saleid/161115.html',
                  'http://www.meici.com/product/detail/id/279635/saleid/120914.html',
                  'http://www.meici.com/product/detail/id/307858/saleid/160280.html',
                  'http://www.meici.com/product/detail/id/61057/saleid/58521.html',]
    rules = (
        Rule(LinkExtractor(allow=('/product/\w+/id/\d+/saleid/\d+.html')),callback='parse_item',follow=True),
    )


    def parse_item(self, response):
        reg = re.compile('\s*')
        xml = response
        brand = xml.xpath('//*[@id="content"]/div/div[1]/div[2]/h1/a/text()').extract()[0]
        productitle = xml.xpath('//*[@id="content"]/div/div[1]/div[2]/div[1]/div/text()').extract()[0]
        price = xml.xpath('//*[@id="content"]/div/div[1]/div[2]/div[2]/div/div/span/em/text()').extract()[0]
        # a = re.compile('class="colorcur" color-id="(\d*)" title="(.*)">')
        # color = re.findall(a, response)

        color = xml.xpath('//li[@class="colorcur"]/@title').extract()[0]
        szie = xml.xpath('//div[@class="pro_size"]//ul/li/a/text()').extract()
        proimg = xml.xpath('//div[@class="proImg"]//img/@src').extract()
        prodata1 = xml.xpath('//div[@class="proTableinfo"]//th//text()').extract()
        prodata2 = xml.xpath('//div[@class="proTableinfo"]//td//text()').extract()
        brandstory = xml.xpath('//div[@class="proBrand_l"]/p/text()').extract()[0]
        brandimg = xml.xpath('//div[@class="proBrand_r"]/img/@src').extract()[0]
        # print brandStory
        meiciid = xml.xpath('//td[@class="product_sku"]/text()').extract()[0]

        # print brand,productitle,price
        # print color,szie
        # print proimg
        # print len(prodata1),len(prodata2)
        # print brandstory
        # print brandimg
        # print meiciid
        del prodata2[9]
        del prodata2[10]
        key = []
        for i in prodata1:
            # i = "'" + i + "'"
            i=reg.sub("",i)
            key.append(i)
        value = []
        for j in prodata2:
            # j = "'" + j + "'"
            j = reg.sub("", j)
            value.append(j)
        prodata = dict(zip(key, value))
        prodata = json.dumps(prodata, ensure_ascii=False)
        # print prodata

        item = items.JsArticleItem()
        item['brand'] = brand
        item['productitle'] = productitle
        item['price'] = price
        item['color'] = color
        item['szie'] = str(szie)
        item['proimg'] = str(proimg)
        item['prodata'] = prodata
        item['brandstory'] = brandstory
        item['brandimg'] = brandimg
        item['meiciid'] = meiciid

        yield item



