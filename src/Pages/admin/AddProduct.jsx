import {useState} from "react";
import {useDocData} from "../../hooks/useDocData";
import {ContentLoader} from "../../components/UI/Loader/ContentLoader";
import {collection, doc, setDoc} from "firebase/firestore";
import {db, storage} from "../../API/Firebase";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

export const AddProduct = () => {
    const [pData,setpData]=useState({});
    const [images,setImage]=useState('');
    const {name,description,price}=pData;
    const [newService,setNewService]=useState('');
    const [selectedOption,setOption]=useState('');
    let url=[];

    const onChangeData = (e) => {
        setpData({...pData, [e.target.name]: e.target.value})
    }
    const [catalog,loading,setCatalog]=useDocData('Catalog','all');
    console.log(catalog)
    // function selectBC(bc) {
    //     setpData(bc)
    // }
    async function uploadImage() {

        if(images ){

            const imgRef=ref(storage,`products/${selectedOption}/${pData.name}/${images.name}`);
            for (const image of images) {
                const snap = await uploadBytes(imgRef, image);
                url.push(await getDownloadURL(ref(storage, snap.ref.fullPath)));
            }
        }
    }


    let [user]=useDocData('users');
    const addProduct=async ()=>{
        const docRef=await doc(collection(db, 'Catalog', selectedOption,selectedOption));
        await uploadImage();
        await setDoc(docRef, {
            name:pData.name,
            id:docRef.id,
            description:pData.description,
            price:pData.price,
            addedBy:{companyName:user.username, createdAt:Date.now()},
            product_img:url || 'https://orbitados.uca.es/wp-content/uploads/2016/03/posts-25.jpg'
            });

        alert('Added!');
        console.log(docRef)
    }
    const createService=async () => {
        await setDoc(doc(db,'Catalog',newService),{name:newService});
        setNewService('');
    }
    return (
        <><div className="add-busness-center-box">
            <h5>Добавить Продукт</h5>
            {/*{loading?<ContentLoader/>: */}
            {/* <table id="usersList" style={{marginTop: "10px"}} className="table table-hover">*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th scope={'col'}>ID</th>*/}
            {/*        <th scope="col">Image</th>*/}
            {/*        <th scope="col">Full name</th>*/}
            {/*        <th scope="col">Price</th>*/}

            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {premises.map((bc,index)=>{*/}
            {/*        return(*/}
            {/*            <tr key={index} onClick={()=>{selectBC(bc)}}>*/}
            {/*                <td className={"p-1"}> {index+1}</td>*/}
            {/*                <td className={"p-1"}> <img style={{width: "50px", height: "50px"}} src={bc.bs_img[0]} alt=""/></td>*/}
            {/*                <td className={"p-1"}> {bc.name}</td>*/}
            {/*                <td className={"p-1"}>{bc.address}</td>*/}
            {/*                <td className={"p-1"}>{bc.geo[0]},{bc.geo[1]}</td>*/}


            {/*            </tr>*/}
            {/*        )})}*/}
            {/*    </tbody>*/}
            {/*</table>}*/}

            <span>Каталог</span>
            <select onChange={(e)=>{setOption(e.target.value)}} className={'form-control'} defaultValue={''}>
                <option  value="" disabled>Товары</option>
                {catalog.map((c)=><option  value={c.name}>{c.name}</option>)}
            </select>
            <span>Название товара:</span>
            <input type="text" value={newService} name={'newService'} className={'form-control'} onChange={(e)=>{setNewService(e.target.value)}}/>

            <button className={'btn btn-primary my-3'} onClick={createService}>Создать Новый Товар</button>

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
                <input
                    type="text" id="fullName"
                    required="required"
                    value={description}
                    name={'description'}
                    onChange={onChangeData}
                    className="form-control"/>

                <span>Цена: </span>
                <input
                    type="number" id="fullName"
                    value={price}
                    name={'price'}
                    onChange={onChangeData}
                    required="required"
                    className="form-control"/>


                <span>Изоброжение: </span>
                <input
                    type="file" id="fullName"
                    required="required"
                    multiple="multiple"
                    onChange={(e)=>{setImage(e.target.files)}}
                    accept={"image/*"}
                    className="form-control"/>

            </div> <br/>
            <button className="btn btn-info m-lg-1" onClick={addProduct} >Добавить </button>
        </div></>
    )}