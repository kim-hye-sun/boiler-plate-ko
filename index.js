const express = require('express')
const app = express()
const port = 5000
//bodyparser : client가 가져오는 정보를 서버에서 분석해서 가져올수 있게 해주는것
const bodyParser = require('body-parser');
const {User} = require("./models/User");

//application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));
//application/json으로 된 걸 분석해서 가져올 수 있게 함
app.use(bodyParser.json());

const mongoose = require('mongoose');

const config = require("./config/key");
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! !! 안녕하세요~ 만나서 반갑습니다')
})


app.post('/register',(req, res) => {
  //회원 가입 할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body)
  user.save((err, doc) => //doc = userInfo가 들어있음
  {if(err) return res.json({success:false,err})
    return res.status(200).json({ //state(200)은 성공했다는 뜻 -> json 형식으로 success:true를 전달
      success:true
    })
  }
  ) //여기 save는 몽고DB에서 오는 메소드
  //save해주면 user 정보들이 저장됨 

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})