from django.http import HttpResponse
from django.shortcuts import render
from requests import request
import requests

def home(requests):
    return render(requests, 'index.html')
def login(requests):
    return render(requests,'logreg.html')