# WeatherPJT
[ Weather API Server (NodeJS) ]<br>

- Ubuntu Setup [AWS] <br>
  o mongodb 설치 <br>
    $ sudo apt-get install mongodb-clients mongodb-server <br>
    # 설치 확인 <br>
    $ mongo --version <br>
    $ mongod --version <br>
    # 클라이언트 접속  <br>
    $ mongo <br>
    > show dbs <br>
    > exit <br>
    # 프로세스 확인 <br>
    $ sudo netstat -ntlp | grep mongod <br><br>
    
  o ubutu에 nodejs와 npm 설치 <br>
    $ sudo apt-get install nodejs npm <br>
    $ sudo apt update <br>
    $ sudo apt install nodejs npm <br>
    => 위의 방식에서 AWS에서는 오래된 nodejs가 설치됨<br>
    => 최신 버전을 설치하기 위해서 아래와 같이 수행한다. <br>
    $ sudo npm install -g n  <br>
    $ sudo n stable <br>
    
    
  o git로 소스 다운로드 <br>
    $ mkdir node_project <br>
    $ cd node_project <br>
    $ git cnofig --global user.name="minsoub@gmail.com" <br>
    $ git config --global user.name="minsoub@gmail.com" <br>
    $ git init <br>
    $ git pull https://github.com/minsoub/WeatherPJT.git <br><br>
      
  o nodejs package 설치 <br>
    $ npm install <br>
    
  o 프로그램 가동 <br>
    $ node server.js
    
  o Ubuntu 서비스 등록
    $ vi /etc/systemd/system/weather.service <br>
     [Unit] <br>
      Description = Weather Site Server<br>
      After = syslog.target network.target<br>
     [Service]<br>
      User = ubuntu<br>
      Environment="PATH=/home/ubuntu/node_project"<br>
      ExecStart=node /home/ubuntu/node_project/server.js<br>
     [Install]<br>
      WantedBy = multi-user.target<br>
   $ sudo systemctl daemon-reload <br>
   $ sudo systemctl enable weather <br>
   $ sudo systemctl start weather <br>
  
    
- Local에서 작업하기<br>
  o github.com/minsoub/WeatherPJT에서 소스를 내려 받는다<br>
    git clone https://github.com/minsoub/WeatherPJT.git <br>
  o 해당 디렉토리에서 npm install을 실행해서 node_module을 생성한다. <br>
  

