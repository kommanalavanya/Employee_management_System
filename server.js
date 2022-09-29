var express=require("express")
var app=express()
const bodyParser=require('body-parser')
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:false}))
var mysql=require("mysql2")
var session =require('express-session')
app.use(session({secret: 'super secret'}));

var mysql=require("mysql2")

var con=mysql.createConnection({
  host:"your hostname",
  user:"your username",
  password:"",
  database:""
  
});


app.get("/",(req,res)=>{

res.render('index');
});
app.get("/home",(req,res)=>{

  res.render('index');
  });

app.get("/adminlogin",(req,res)=>{

    res.render('adminlogin',{x:''});
});

app.post("/adminLoginDB",(req,res)=>{
 
 var uname=req.body.uname
 var psw=req.body.pwd

 if(uname=="admin" && psw=="admin")
     res.render('adminhome');
 else
     res.render('adminlogin',{x:'Invalid login credentials'});
});

app.get("/userlogin",(req,res)=>{
  res.render('userlogin')
});
app.get("/About",(req,res)=>{
  res.render('About')
});

app.get("/register",(req,res)=>{
    res.render('register')
  });


app.post("/userRegDB" ,(req,res)=>{

  fname=req.body.fname
  lname=req.body.lname
  mail=req.body.mail
  contact=req.body.contact
  dob=req.body.dob
  location=req.body.location
  pwd=req.body.pwd
  eid=req.body.eid

  var sql="insert into users(eid,fname,lname,mail,contact,pwd,dob,location) values("+eid+",'"+fname+"','"+lname+"','"+mail+"','"+contact+"','"+pwd+"','"+dob+"','"+location+"')"
con.query(sql,function(err,result){
    
    if(err)
        throw err
   res.render('userlogin')
});

con.connect(function(err){
    if(err)
        throw err
    var sql
});

});
app.post("/userloginDB",(req,res)=>{
  var sessionData = req.session;

  var uname=req.body.email
  var psw=req.body.password

  var sql="select * from users where mail='"+uname+"' and pwd='"+psw+"' "
  con.query(sql,function(err,result){


  if(err)
  {
   throw err
  }
  else if(result.length<0){
    res.render('userlogin')
  }
  else{
    var user = result[0]
    req.session.userid = user.eid;
   
       
    //req.session.user_name = users.fname
 
     res.render('emphome'); }
});
  con.connect(function(err){
  if(err)
    throw err
  var sql
});

});
app.get("/addemp",(req,res)=>{

  res.render('addemp');
});

app.post("/addempDB" ,(req,res)=>{
  id=req.body.eid
  fname=req.body.fname
  lname=req.body.lname
  mail=req.body.mail
  contact=req.body.contact
  dob=req.body.dob
  location=req.body.location
basic=req.body.basic
pf=req.body.pf
incometax=req.body.incometax
hra=req.body.hra
ma=req.body.ma
conveyance=req.body.conveyance
sa=req.body.sa

r1=Number(hra)+Number(ma)+Number(conveyance)+Number(sa)
r2=(r1+Number(basic))-(Number(pf)+Number(incometax))


var sql="insert into addemp(eid,fname,lname,mail,contact,dob,location,basic,pf,incometax,hra,ma,conveyance,sa,netpay) values("+id+",'"+fname+"','"+lname+"','"+mail+"','"+contact+"','"+dob+"','"+location+"',"+basic+","+pf+","+incometax+","+hra+","+ma+","+conveyance+","+sa+","+r2+")"

con.query(sql,function(err,result){
    
    if(err)
        throw err
    res.render('addemp')
});

con.connect(function(err){
    if(err)
        throw err
    var sql
});

});



app.get("/empdet",(req,res)=>{
  var sql="select *from addemp"  
  con.query(sql,function(err,result){
    
    if(err)
        throw err
   res.render('empdet',{data:result})
});

con.connect(function(err){
    if(err)
        throw err
    var sql
});
});
app.post("/editdb",(req,res)=>{
  id=req.body.eid
  var sql="select *from addemp where eid="+id+""  
  con.query(sql,function(err,result){
    
    if(err)
        throw err
   
   res.render('edit',{data:result})
   
});

con.connect(function(err){
    if(err)
        throw err
    var sql
});
});

app.post("/updateempDB",(req,res)=>{
  fname=req.body.fname
  lname=req.body.lname
  mail=req.body.mail
  contact=req.body.contact
  dob=req.body.dob
  location=req.body.location
basic=req.body.basic
pf=req.body.pf
incometax=req.body.incometax


  id=req.body.id
  var sql="update addemp set fname='"+fname+"',lname='"+lname+"',mail='"+mail+"',contact='"+contact+"',dob='"+dob+"',location='"+location+"',basic="+basic+",pf="+pf+",incometax="+incometax+" where eid="+id+" "  
  con.query(sql,function(err,result){
    
    if(err)
        throw err
   
   
});

con.connect(function(err){
    if(err)
        throw err
    var sql
});
var sql3="update users set fname='"+fname+"',lname='"+lname+"',mail='"+mail+"',contact='"+contact+"',dob='"+dob+"',location='"+location+"' where eid="+id+" "  
  con.query(sql3,function(err,result){
    
    if(err)
        throw err
   
   
});

con.connect(function(err){
    if(err)
        throw err
    var sql
});
var sql2="select *from addemp";
con.query(sql2,function(err,result){
    
  if(err)
      throw err
 
  res.render('empdet',{data:result})
});

con.connect(function(err){
  if(err)
      throw err
  var sql
});

});

app.get("/profile",(req,res)=>{
  var eid= req.session.userid
  var sql2="select *from users where eid="+eid+"";
 
   con.query(sql2,function(err,result){
    
  if(err)
      throw err
 
  res.render('profile',{data:result})
});

con.connect(function(err){
  if(err)
      throw err
  var sql
});

});

app.get("/viewsalary",(req,res)=>{
  id=req.session.userid

  var sql="select  *from addemp where eid="+id+"";
  
  
  con.query(sql,function(err,result){
 
    
    if(err){
        throw err}
    else if(result.length<=0){
          res.render('nosalary',{res1:'your salary was not added ,kindly wait for the update'})
        }
        else{
    ge=result[0].basic+result[0].hra+result[0].ma+result[0].conveyance+result[0].sa
    gd=result[0].pf+result[0].incometax

    res.render('viewsalary',{data:result,ge1:ge,gd1:gd})}
  });
  
  con.connect(function(err){
    if(err)
        throw err
    var sql
  });
  
 
});
app.post("/editdb",(req,res)=>{
  id=req.body.eid
  var sql="select *from addemp where eid="+id+""  
  con.query(sql,function(err,result){
    
    if(err)
        throw err
   
   res.render('edit',{data:result})
   
});

con.connect(function(err){
    if(err)
        throw err
    var sql
});
});

app.post("/deletedb",(req,res)=>{
  id=req.body.eid
  var sql="delete from addemp where eid="+id+""
  con.query(sql,function(err,result){
    
    if(err)
        throw err
   

   
});

con.connect(function(err){
    if(err)
        throw err
    var sql
});
var sql3="delete from users where eid="+id+""
  con.query(sql3,function(err,result){
    
    if(err)
        throw err
   

   
});

con.connect(function(err){
    if(err)
        throw err
    var sql3
});
var sql2="select *from addemp";
con.query(sql2,function(err,result){
    
  if(err)
      throw err
 
  res.render('empdet',{data:result})
});

con.connect(function(err){
  if(err)
      throw err
  var sql2
});

});
app.post("/editprofdb",(req,res)=>{
  id=req.body.eid
  var sql="select *from users where eid="+id+""  
  con.query(sql,function(err,result){
    
    if(err)
        throw err
   console.log(result[0].eid)
   res.render('editprofile',{data:result})
   
});

con.connect(function(err){
    if(err)
        throw err
    var sql
});
});

app.post("/updateprofdb",(req,res)=>{
  fname=req.body.fname
  lname=req.body.lname
  mail=req.body.mail
  contact=req.body.contact
  pwd=req.body.pwd
  id= req.body.eid
  var sql="update users set fname='"+fname+"',lname='"+lname+"',mail='"+mail+"',contact='"+contact+"',pwd='"+pwd+"' where eid="+id+" "  
  con.query(sql,function(err,result){
    
    if(err)
        throw err
   
   
});

con.connect(function(err){
    if(err)
        throw err
    var sql
});
var sql3="update addemp set fname='"+fname+"',lname='"+lname+"',mail='"+mail+"',contact='"+contact+"' where eid="+id+" "  
  con.query(sql3,function(err,result){
    
    if(err)
        throw err
   
   
});

con.connect(function(err){
    if(err)
        throw err
    var sql
});
var sql2="select *from users where eid="+id+"";
con.query(sql2,function(err,result){
    
  if(err)
      throw err
 
  res.render('profile',{data:result})
});

con.connect(function(err){
  if(err)
      throw err
  var sql
});

});


var server=app.listen(8900,function(){
  console.log("server is running at port 8900")
});