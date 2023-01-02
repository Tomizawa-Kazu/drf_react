# drf_recrtアプリ

下記コマンドで起動する
```
docker-compose up
```
起動後、下記URLで確認できる
```
http://localhost:8005
```

### docker環境での開発
1. 用意するもの
   - Dockerfile
   - docker-compose.yml
   - requirements.txt

2. startproject
   - ``` docker-compose up -d --build ```
   - ``` docker-compose run web django-admin.py startproject プロジェクト名 . ```

3. databaseの設定
   - settings.py
   - 例
   ```
   DATABASES = {
     'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'db',
        'PORT': 5432,
    }
   }
   ```

4. runserverみたいなもの
   - ``` docker-compose up --build ```
   - ``` docker-compose up ```

5. 動作確認
   - Djangoのロケットが表示されれば完了
   - コンテナに入る方法
   - ```docker container exec -it calender_app bash```

6. その他コマンド
   - アプリ作成
   ``` docker-compose run --rm web django-admin startapp アプリ名 ```
   - マイグレーション
   ``` docker-compose run --rm web python3 manage.py makemigrations ```
   - マイグレイト
   ``` docker-compose run --rm web python3 manage.py migrate ```
   - クリエイトユーザ
   ``` docker-compose run --rm web python3 manage.py createsuperuser ```

7. pgadminのserver接続情報
   1. docker起動し、`http://localhost:8005/browser/`にアクセスする
   2. docker-compose.ymlで指定した、Emailとpasswordでログインする
   3. Serversに下記の情報を入力する
   ```
   Hostname:docker-compose.ymlで指定したサービス名 ex)db
   Port:5432
   username:docker-compose.ymlで指定したusername
   password:docker-compose.ymlで指定したpassword
   ```

### アプリイメージ
![カレンダー](/img/) 


### API endpoint 一覧
- `admin/` → DjangoのAdmin Dash board
- `auth` → 登録されたUsernameとPasswordをPOSTするとTokenが返ってくる
- `api/tasks` → TaskのCRUD: Create/Read/Update/Delete(ログインユーザのみ)
- `api/users` → Create/Readのみ可能(ログインしていないユーザも可能)
- `api/myself` → ログインユーザ自身のidとusernameを取得、更新できる