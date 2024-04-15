
export const customergetUsers=((req,res)=>{
    try{
    connection.query("SELECT * FROM users",(err,result)=>{
        if(err){
            console.log(err)
            return
        }else{
            res.send(result)
        }

    })
}
catch(err){
    console.log(err)
}
})
