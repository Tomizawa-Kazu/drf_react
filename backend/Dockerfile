FROM python:3.9
USER root
ENV PYTHONUNBUFFERED 1
RUN mkdir /drf_app
WORKDIR /drf_app
COPY requirements.txt /drf_app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
ADD . /drf_app/
