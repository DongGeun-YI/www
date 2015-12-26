__author__ = 'Macbookair'


from django.db import models as m

class MainPage(m.Model):
    title = m.CharField(max_length=255)
    mainImage = m.ImageField()
    subtitle = m.CharField(max_length=255)
    date = m.DateField()
    place = m.CharField(max_length=255)
    description = m.TextField()