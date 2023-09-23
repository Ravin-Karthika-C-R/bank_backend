const mongoose=require('mongoose')



mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
      useNewUrlParser:true
}).then(()=>{
    console.log("_____Mongodb Atlas Connected_______");
}).catch(()=>{
    console.log("____Mdb Atlas Not Connected______");
})