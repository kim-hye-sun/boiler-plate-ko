const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true, //trim은 띄어쓰기를 없애 줌
    },
    password:{
        type: String,
        minlength: 5
    },
    leastname:{
        type: String,
        maxlength: 50
    },
    role:{  //어떤 유저가 관리자가 될 수도 있고 일반 유저가 될 수도 있기 때문에 role을 줌
        type:Number,    //1이면 관리자 0이면 일반 유저 이렇게 구분
        default:0   //role을 지정해주지 않으면 디폴트 값으로 0을 주겠다는 의미
    },
    image:String,
    token:{ //토큰을 이용해서 유효성을 관리할 수 있음
        type: String
    },
    tokenExp:{  //토큰의 유효기간 -> 토큰을 사용할 수 있는 기간
        type:Number
    }


})



const User = mongoose.model('User', userSchema) //스키마를 모델로 감싸줌 model('모델의 이름', 스키마 이름)
module.exports = {User} //다른 곳(파일)에서도 이 user를 쓸 수 있도록 export
