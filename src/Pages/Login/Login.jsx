import {Link, useNavigate} from "react-router-dom";
import {SignContainer} from "../../components/UI/SignContainer";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {signInWithEmailAndPassword, signOut} from "firebase/auth";
import {auth, db} from "../../API/Firebase";
import {useState} from "react";

export const Login = () => {


    const navigate=useNavigate();
    const [data,setData] = useState({
        name:'',
        email:'',
        password:'',
        error:null,
        loading:false
    })
    const {email,password,error,loading}=data
    const handleChange=(e)=>{setData({...data,[e.target.name]:e.target.value})}

    async function submitLoginForm() {
        setData({...data, error: null ,loading:true});
            setData({...data, error: <p className={"alert alert-success"}>Loading...</p>, loading: true});
            try {
               await signInWithEmailAndPassword(auth, email, password);
                await  getDoc(doc(db,'users',auth.currentUser.uid)).then(
                    async (data) => {
                        if (data.exists) {
                            if (data.data().isDisabled) {
                                await signOut(auth);
                                alert("Banned by Administrator!")
                            }
                            else if(!data.data().isActive){
                                await signOut(auth);
                                alert("Благодорим вас за регистрацию на нашем сайте! Пожалуйста подождите пока ваш аккаунт не будет активирован!")
                            }
                            else {
                                setData({email: '', password: ''})
                                window.location.href=('/');
                            }
                        }
                    }
                );
                setData({name:'',email: '',password: '',error: null,loading: false})
                navigate('/');
            }
            catch (err){
                if(err.message==='Firebase: Error (auth/wrong-password).'||err.message==='Firebase: Error (auth/user-not-found).'){setData({...data, error:<p className={"alert alert-warning"}>Error (wrong-password or user-not-found)</p>})}
                else {setData({...data, error:<p className={"alert alert-warning"}>{err.message.replace("Firebase: ",'')}</p>})}
            }
    }

    return (<>
            <SignContainer>
                <div className="sign__form">
                <div className="page__position">
                    <ul className="position__list">
                        <li className="position__item"><Link to="/" className="position__link">Главная</Link></li>
                        <li className="position__item">></li>
                        <li className="position__item"><Link to="/profile" className="position__link">Мой кабинет</Link>
                        </li>
                        <li className="position__item">></li>
                        <li className="position__item"><Link className="position__link" href="">Вход</Link></li>
                    </ul>
                </div>
                <div className="sign-form">
                    <div className="sign__title">
                        Вход
                    </div>
                    <div className="sign__forms">
                        <div className="form__sign">
                            <form onSubmit={(e)=>{e.preventDefault(); submitLoginForm();}}>

                                <div className="mb-3">
                                    <label htmlFor="inputEmail" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="inputEmail" name="email"
                                           aria-describedby="emailHelp" value={email} onChange={handleChange} placeholder="Введите Вашу электронную почту"
                                           pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$"
                                           title="Пример почты: example@email.com"
                                           required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1"
                                           name="password"
                                           value={password} onChange={handleChange}
                                           placeholder="Введите Ваш пароль" required/>
                                </div>
                                <div>
                                    <span className="text-danger">{error}</span>
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"
                                           name="remember_me"/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">Запомнить меня</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Войти</button>
                            </form>
                        </div>
                        <div className="form__sign-up">
                            <div className="sign__text">
                                Создание учетной записи поможет покупать быстрее. Вы сможете контролировать
                                состояние
                                заказа, а также просматривать заказы, сделанные ранее. Постоянным покупателям мы
                                предлагаем гибкую систему скидок.
                            </div>
                            <div className="sign__btn">
                                <Link to="/registration/investor"> <button className="btn btn-primary">Регистарция
                                    инвестора</button></Link>
                                {/*<Link to="/registration/company"> <button className="btn btn-primary">Регистарция*/}
                                {/*    компании</button></Link>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </SignContainer>

            </>

    )
}