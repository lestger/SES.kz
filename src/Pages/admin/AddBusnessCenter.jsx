import {ContentLoader} from "../../components/UI/Loader/ContentLoader";
import {useState} from "react";
import {useDocData} from "../../hooks/useDocData";
import {db, storage} from "../../API/Firebase";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {collection, doc, setDoc} from "firebase/firestore";

export const AddBusnessCenter = () => {
    const [product,setProduct]=useState({});
    const [images,setImages]=useState([]);
    let url=[];
    const [user]=useDocData('users');
    const {name,description,price,rooms,geo,address,advantages,floors}=product;
    const onChangeData = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})
    }
    const [premises,loading,setPremises]=useDocData('b_center','all');
    function selectBC(bc) {
        setProduct(bc);
        console.log(bc)
    }
    function getAdvanteges() {
        let temp=product?.advantages?.split('--');
        console.log(temp)
        return temp
    }
    async function uploadImage() {

        if(images ){
            console.log(images);
            const imgRef=ref(storage,`b_center/${product.name}/${images.name}`);
            for (const image of images) {
                const snap = await uploadBytes(imgRef, image);
                url.push(await getDownloadURL(ref(storage, snap.ref.fullPath)));
            }
        }
    }



    const addCenter=async ()=>{
         await uploadImage();
        const docRef=await doc(collection(db,'b_center'));
        await setDoc(docRef,{
            name:product.name,
            id:docRef.id,
            description:product.description,
            price:product.price,
            rooms:product.rooms,
            geo:product.geo,
            address:product.address,
            floors:product.floors,
            addedBy:{companyName:user.username,
                createdAt:Date.now()},
            advantages:getAdvanteges(),
            bs_img:url || 'https://phonoteka.org/uploads/posts/2021-05/1621356863_21-phonoteka_org-p-mnogokvartirnie-doma-fon-31.jpg'});
alert('Added!');
console.log(docRef)
     }

    return (
        <><div className="add-busness-center-box">
            <h5>Добавить Бизнес центр</h5>
            {loading?<ContentLoader/>: <table id="usersList" style={{marginTop: "10px"}} className="table table-hover">
                <thead>
                <tr>
                    <th scope={'col'}>ID</th>
                    <th scope="col">Image</th>
                    <th scope="col">Full name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Location</th>

                </tr>
                </thead>
                <tbody>
                {premises.map((bc,index)=>{
                    return(
                        <tr key={index} onClick={()=>{selectBC(bc)}}>
                            <td className={"p-1"}> {index+1}</td>
                            <td className={"p-1"}> <img style={{width: "50px", height: "50px"}} src={bc.bs_img[0]} alt=""/></td>
                            <td className={"p-1"}> {bc.name}</td>
                            <td className={"p-1"}>{bc.address}</td>
                            <td className={"p-1"}>{bc.geo[0]},{bc.geo[1]}</td>


                        </tr>
                    )})}
                </tbody>



            </table>}
            <div className={'d-flex flex-column'}>
                <label className="productlabel">
                    <span>Название: </span>
                    <input
                        type="text" id="fullName"
                        required="required"
                        value={name}
                        name={'name'}
                        onChange={onChangeData}
                        className="form-control"/>
                </label>

                <span>Описание: </span>
                <textarea
                    type="text" id="fullName"
                    required="required"
                    value={description}
                    name={'description'}
                    onChange={onChangeData}
                    className="form-control"/>

                <span>Адрес</span>
                <input
                    type="text" id="fullName"
                    value={address}
                    name={'address'}
                    onChange={onChangeData}
                    required="required"
                    className="form-control"/>
                <span>Кординаты</span>
                <input
                    type="text" id="fullName"
                    value={geo}
                    name={'geo'}
                    onChange={onChangeData}
                    required="required"
                    className="form-control"/>

                <span>Цена: </span>
                <input
                    type="number" id="fullName"
                    value={price}
                    name={'price'}
                    onChange={onChangeData}
                    required="required"
                    className="form-control"/>

                <span>Кол-во помещении: </span>
                <input
                    type="number" id="fullName"
                    value={rooms}
                    name={'rooms'}
                    onChange={onChangeData}
                    required="required"
                    className="form-control"/>

                <span>Кол-во Этажей: </span>
                <input
                    type="number" id="fullName"
                    value={floors}
                    name={'floors'}
                    onChange={onChangeData}
                    required="required"
                    className="form-control"/>
                <span>Примущества</span>
                <input
                    type="text" id="fullName"
                    value={advantages}
                    name={'advantages'}
                    onChange={onChangeData}
                    required="required"
                    className="form-control"/>
                <span>Изоброжение: </span>
                <input
                    type="file" id="fullName"
                    required="required"
                    multiple="multiple"
                    onChange={(e)=>{setImages(e.target.files)}}
                    accept={"image/*"}
                    className="form-control"/>
<br/>


            </div> <br/>
            <button className="btn btn-info m-lg-1"  onClick={addCenter}>Добавить </button>

        </div></>
    )
}