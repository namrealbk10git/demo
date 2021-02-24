var name_table = "SinhVien"
var SinhVien={
	getAllSinhVien:function(callback){
		return connectionMysqlDb.query(`Select * from ${name_table}`,callback);
	},
	getSinhVienById:function(id,callback){
		return connectionMysqlDb.query(`select * from ${name_table} where Id=?`,[id],callback);
	},
	addSV:function(sinhvien,callback){
		return connectionMysqlDb.query(`Insert into ${name_table}(name,class,dob) values(?,?,?)`, [sinhvien.name,sinhvien.class,sinhvien.dob],callback);
	},
	deleteSV:function(id,callback){
		return connectionMysqlDb.query(`delete from ${name_table} where Id=?`,[id],callback);
	},
	updateSV:function(id,sinhvien,callback){
		return connectionMysqlDb.query(`update ${name_table} set name=?,class=?,dob=? where Id=?`, [sinhvien.name,sinhvien.class,sinhvien.dob,id],callback);
	}
};
 module.exports=SinhVien;