import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db, signOut} from "../../API/Firebase";
import {doc, setDoc} from "firebase/firestore";

export const SignForm = () => {
    const navigate=useNavigate();
    const [data,setData] = useState({
        inv_fullName:'',
        inv_email:'',
        inv_password:'',
        inv_phone:'',
        error:null,
        loading:false
    })
    const [modal,setModal]=useState(false);
    const {inv_fullName,inv_email,inv_password,inv_phone,error,loading}=data
    const handleChange=(e)=>{setData({...data,[e.target.name]:e.target.value})}

    async function submitRegForm() {
        setData({...data, error: null ,loading:true});

        setData({...data, error: <p className={"alert alert-success"}>User created!</p>, loading: true});
        try {
            const result =await createUserWithEmailAndPassword(auth, inv_email, inv_password);
            await setDoc(doc(db,'users',result.user.uid),
                {
                    ID:result.user.uid,
                    username: inv_fullName,
                    email: inv_email,
                    password:inv_password,
                    admin:false,
                    products:[],
                    isDisabled:false,
                    isActive:false,
                    services:[],
                    chat:'',
                    sesPro:false,
                    consultant:{isConsultant:false,users:[]}
                })
            setData({name:'',email: '',password: '',error: null,loading: false})
            signOut(auth);
            navigate('/login')
        }
        catch (err){setData({...data, error:<p className={"alert alert-warning"}>{err.message.replace("Firebase: ",'')}</p>})
        }

    }
    return (
        <><div className="sign-form">
            <div className="sign__title">
                Регистрация инвестора
            </div>
            <div className="sign__forms">
                <div className="form__sign-investor">
                    <form onSubmit={(e)=>{e.preventDefault();submitRegForm()}}>

                        <div className="mb-3">
                            <label  className="form-label"><span
                                style={{color: "red"}}>*</span> Ваша группа</label>
                            <input type="text" className="form-control"
                                   aria-describedby="emailHelp" value={"Инвестор"}  disabled readOnly/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label"><span
                                style={{color: "red"}}>*</span> ФИО</label>
                            <input type="text"  value={inv_fullName} name={'inv_fullName'} onChange={handleChange} className="form-control" id="inputName"
                                   placeholder="Укажите ФИО"

                            />
                            {/*<div className="text-danger">*/}
                            {/*    form.full_name.errors*/}
                            {/*</div>*/}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label"><span
                                style={{color: "red"}}>*</span> E-mail</label>
                            <input type="email" value={inv_email} onChange={handleChange} className="form-control" id="inputEmail"
                                   placeholder="Укажите адрес электронной почты" name={'inv_email'}

                            />
                            {/*<div className="text-danger">*/}
                            {/*    form.email.errors}*/}
                            {/*</div>*/}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputMobile" className="form-label"><span
                                style={{color: "red"}}>*</span> Мобильный телефон</label>
                            <input type="text" value={inv_phone} onChange={handleChange} className="form-control" id="inputMobile"
                                   placeholder="87759145649" name={'inv_phone'}


                            />
                            {/*<div className="text-danger">*/}
                            {/*    form.phone.errors}}*/}
                            {/*</div>*/}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label"><span
                                style={{color: "red"}}>*</span> Пароль</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"
                                   placeholder="Придумайте надёжный пароль" onChange={handleChange} name={'inv_password'} value={inv_password}

                            />
                            {/*<div className="text-danger">*/}
                            {/*    form.password.errors}}*/}
                            {/*</div>*/}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword2" className="form-label"><span
                                style={{color: "red"}}>*</span> Подтвердите пароль</label>
                            <input type="password" className="form-control"  id="exampleInputPassword2"
                                   placeholder="Повторите Ваш введенный пароль" name="repeat_password"

                            />

                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" name="agree"
                                   required/>
                            <label className="form-check-label" htmlFor="exampleCheck1">Я прочитал и
                                принимаю <a
                                    href="#">условия соглашения </a></label>
                            <button className="btn btn-primary" >Зарегистрироваться</button>


                        </div>
                    </form> <div className="text-danger">
                    {error}
                </div>
                </div>
            </div>
        </div></>
    )
}