const UserModel = require('./UserModel');
const userModel = require('./UserModel');
const bcrypt = require('bcryptjs');
//1. kiem tra email,password
//2. kiem tra email co ton tai trong database khong
//3. kiem tra password co dung ko
//4. neu dung, tra ve thong tin user
//5. neu sai, tra ve null
const login = async (email, password) => {
    // const user=users.find(u => u.email==email);
    // if(user && user.password==password)
    // {
    //     return user;
    // }
    // return null;

    try {
        const user = await userModel.findOne({ email: email });

        if (user) {
            const result=bcrypt.compareSync(password,user.password);
            return result?user:false;
        }

    } catch (error) {
        console.log('login error: ', error);

    }
    return false;

}

const register = async (email, password, name,address,phoneNumber) => {
    try {
        // kiem tra email da co hnay chua
        // selec * form users where email=email
        const user = await userModel.findOne({ email: email });
        if (user) {
            console.log("Email đã được đăng kí");
            return false;
        }
        // them moi user vao data
        // ma hoa password
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        const newUser = { email, password:hash, name ,address,phoneNumber,role:1};
        const u = new userModel(newUser);
        await u.save();
        return true;


    } catch (error) {
        console('register error: ', error);

    }
    return false;

}
//// //name: { type: String },
// email: { type: String },
// password: { type: String },
// address:{type: String},
// phoneNumber:{type:Number},
// gender
// role:{type: Number,default:1},
// image: { type: String, default: "" },
const updateUser = async (name, email, password, address,phoneNumber, gender,dob, image) => {
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            user.name = name ? name : user.name;
            user.email=email? email:user.email;
            user.password = password ? password : user.password;
            user.address = address ? address : user.address;
            user.gender = gender ? gender : user.gender;
            user.phoneNumber=phoneNumber?phoneNumber:user.phoneNumber;
            user.dob = dob ? dob : user.dob;
            user.image = image ? image : user.image;


            await user.save();
            console.log("INFO USER:", user);

            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log("Update User  error", error)
        return false;
    }
}
module.exports = { login, register,updateUser };