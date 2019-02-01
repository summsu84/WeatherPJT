# WeatherPJT
[ Weather API Server (NodeJS) ]<br>

# Ubuntu Setup [AWS] <br>
  # mongodb 설치 <br>
    $ sudo apt-get install mongodb-clients mongodb-server 
    $ - 설치 확인 
    $ mongo --version 
    $ mongod --version 
    $ - 클라이언트 접속  
    $ mongo 
    $> show dbs 
    $> exit 
    $ - 프로세스 확인 
    $ sudo netstat -ntlp | grep mongod 
    
  # ubutu에 nodejs와 npm 설치 <br>
    $ sudo apt-get install nodejs npm 
    $ sudo apt update 
    $ sudo apt install nodejs npm 
    $ => 위의 방식에서 AWS에서는 오래된 nodejs가 설치됨
    $ => 최신 버전을 설치하기 위해서 아래와 같이 수행한다. 
    $ sudo npm install -g n  
    $ sudo n stable 
    
    
  # git로 소스 다운로드 
    $ mkdir node_project
    $ cd node_project <br>
    $ git cnofig --global user.name="minsoub@gmail.com" 
    $ git config --global user.name="minsoub@gmail.com" 
    $ git init <br>
    $ git pull https://github.com/minsoub/WeatherPJT.git 
      
  # nodejs package 설치 
    $ npm install 
    
  # 프로그램 가동 <br>
    $ node server.js
    
  # Ubuntu 서비스 등록
    $ vi /etc/systemd/system/weather.service 
      [Unit] >
      Description = Weather Site Server
      After = syslog.target network.target
     [Service]
      User = ubuntu
      Environment="PATH=/home/ubuntu/node_project"
      ExecStart=node /home/ubuntu/node_project/server.js
     [Install]
      WantedBy = multi-user.target
    $ sudo systemctl daemon-reload 
    $ sudo systemctl enable weather 
    $ sudo systemctl start weather 
  
    
# Local에서 작업하기<br>
    - github.com/minsoub/WeatherPJT에서 소스를 내려 받는다
    $ git clone https://github.com/minsoub/WeatherPJT.git 
    - 해당 디렉토리에서 npm install을 실행해서 node_module을 생성한다.
  
