import {SignContainer} from "../../components/UI/SignContainer";

export const RegisterCompany = () => {
    return (
        <SignContainer>
            <div className="sign__form">
                <div className="page__position">
                    <ul className="position__list">
                        <li className="position__item"><a href="#" className="position__link">Главная</a></li>
                        <li className="position__item"><a> > </a></li>
                        <li className="position__item"><a href="/profile" className="position__link">Мой кабинет</a>
                        </li>
                        <li className="position__item"> > </li>
                        <li className="position__item"><a className="position__link" href="">Регистрация инвестора</a>
                        </li>
                    </ul>
                </div>
            <div className="sign-form">
                <div className="sign__title">
                    Регистрация компании
                </div>
                <div className="sign__forms">
                    <div className="form__sign-company">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label"><span
                                    style={{color: "red"}}>*</span>
                                    Ваша
                                    группа</label>
                                <input type="text" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp"
                                       value="Компания" disabled readOnly/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label"><span
                                    style={{color: "red"}}>*</span>
                                    Наименование организации</label>
                                <input type="text" className="form-control" id="exampleInputPassword1"
                                       placeholder="ТОО “Ромашка”"
                                       value="{{ form_company.name.value|default_if_none:'' }}"
                                       name="name"/>
                                    <div className="text-danger">form_company.errors.name}}</div>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label"><span
                                    style={{color: "red"}}>*</span>
                                    Форма предпринимательства</label>
                                <select className="form-select" aria-label="Default select example" name="type">
                                      for type_id, type_text in company_class.TYPES_CHOICES %}
                                    <option value="{{ type_id }}">
                                              if form_company.type.value == type_id|stringformat:"i" %}
                                            selected
                                              endif %}
                                    >type_text}}</option>
                                      endfor %}
                                </select>
                                <div className="text-danger">form_company.errors.type}}</div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label"><span
                                    style={{color: "red"}}>*</span>
                                    Юридический адрес</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" name="address"
                                       placeholder="Укажите юр. адрес организации"
                                       value="{{ form_company.address.value|default_if_none:'' }}"/>
                                    <div className="text-danger">form_company.errors.address}}</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label"><span
                                    style={{color: "red"}}>*</span>
                                    БИН
                                    / ИИН</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" name="bin_iin"
                                       placeholder="123456789123"
                                       value="{{ form_company.bin_iin.value|default_if_none:'' }}"/>
                                    <div className="text-danger">form_company.errors.bin_iin}}</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label"><span
                                    style={{color: "red"}}>*</span>
                                    ИИК</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" name="iik"
                                       placeholder="Укажите расчётный счёт организации"
                                       value="{{ form_company.iik.value|default_if_none:'' }}"/>
                                    <div className="text-danger">form_company.errors.iik}}</div>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label"><span
                                    style={{color: "red"}}>*</span>
                                    БИК</label>
                                <input type="text" className="form-control" placeholder="Укажите БИК банка" name="bik"
                                       value="{{ form_company.bik.value|default_if_none:'' }}"/>
                                    <div className="text-danger">form_company.errors.bik}}</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label"><span
                                    style={{color: "red"}}>*</span>
                                    Наименование банка</label>
                                <input type="text" className="form-control" name="bank_name"
                                       placeholder="Укажите наименование банка"
                                       value="{{ form_company.bank_name.value|default_if_none:'' }}"/>

                                    <div className="text-danger">form_company.errors.bank_name}}</div>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword2" className="form-label"><span
                                    style={{color: "red"}}>*</span> Мобильный телефон</label>
                                <input type="text" className="form-control" id="exampleInputPassword1"
                                       placeholder="87759145649"
                                       name="phone"
                                       value="{{ form_user.phone.value|default_if_none:'' }}"/>
                                    <div className="text-danger">form_user.phone.errors}}</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label"><span
                                    style={{color: "red"}}>*</span> E-mail</label>
                                <input type="email" className="form-control" id="exampleInputPassword1"
                                       placeholder="Укажите адрес электронной почты"
                                       title="Пример почты: example@email.com"
                                       name="email"
                                />
                                    <div className="text-danger">form_user.errors.email}}</div>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label"><span
                                    style={{color: "red"}}>*</span>
                                    ФИО
                                    ответственного сотрудника</label>
                                <input type="text" className="form-control"
                                       placeholder="Повторите Ваш введенный пароль"
                                       name="full_name"
                                       value="{{ form_user.full_name.value|default_if_none:'' }}"/>
                                    <div className="text-danger">form_user.errors.full_name}}</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label"><span
                                    style={{color: "red"}}>*</span>
                                    Пароль</label>
                                <input type="password" className="form-control"
                                       placeholder="Придумайте надёжный пароль"
                                       name="password"
                                       />
                                    <div className="text-danger">form_user.errors.password}}</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">
                                    <span style={{color: "red"}}>*</span>
                                    Подтвердите пароль
                                </label>
                                <input type="password" className="form-control"
                                       placeholder="Повторите Ваш введенный пароль"
                                       name="repeat_password"
                                />
                                    <div className="text-danger">form_user.errors.repeat_password}}</div>
                            </div>

                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">Я прочитал и принимаю <a
                                        href="#">условия
                                        соглашения </a></label>

                                    <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </SignContainer>
    )
}