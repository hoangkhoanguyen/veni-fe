import React, { useEffect, useState } from 'react'
import productService from '../../services/productService'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { path } from '../../constant'
import './MyStore.scss'
import {toast } from 'react-toastify'
import Validate from '../../services/Validate'
import { TitlePage } from '../../TitlePage/TitlePage'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

export const MyStore = () => {
    const navigate = useNavigate()

    const [productList, setProductList] = useState()
    const [addValue, setAddValue] = useState([])
    const [addQuantityMode, setAddQuantityMode] = useState(false)
    const [addProductInfoMode, setaddProductInfoMode] = useState(false)
    const [editProductInfoMode, setEditProductInfoMode] = useState(false)
    const [deleteProductMode, setDeleteProductMode] = useState(false)
    // const []
    const [editProductInfo, setEditProductInfo] = useState({})
    const [newProductInfo, setNewProductInfo] = useState({})
    const [productIdToDelete, setProductIdToDelete] = useState()
    const isLogin = useSelector(state=>state.user.isLogin)

    const getAllProduct = async () => {
        try {
            let result = await productService.getAllProductsFromMyStore()
            console.log(result)
            if (result && result.errCode === 0) {
                setProductList(result.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(!isLogin) {
            // navigate(path.LOGIN)
        }
    },[isLogin])


    useEffect(() => {
        getAllProduct()
    }, [])

    useEffect(() => {
        if (productList && productList.length > 0) {
            setAddValue(productList.map(item => ''))
        }
    }, [productList])


    const handleChangeInput = (e, key) => {
        if (key === 'price' && !Validate.ValidateOnlyNumbers(e.target.value)) return
        setNewProductInfo({
            ...newProductInfo,
            [key]: e.target.value
        })
    }

    const handleChangeInputEditMode = (e, key) => {
        if (key === 'price' && !Validate.ValidateOnlyNumbers(e.target.value)) return
        setEditProductInfo({
            ...editProductInfo,
            [key]: e.target.value
        })
    }

    const handleClickAddNewProduct = async () => {
        if (!Validate.ValidateMustNotEmpty(newProductInfo.name)) {
            toast.error('Name of product must not be empty!')
            return
        }
        if (!Validate.ValidateNormalLetter(newProductInfo.name)) {
            toast.error('Name of product must contain normal letters!')
            return
        }
        if (!Validate.ValidateMustNotEmpty(newProductInfo.price)) {
            toast.error('Price of product must not be empty!')
            return
        }
        if (!Validate.ValidateMustNotEmpty(newProductInfo.image)) {
            toast.error('Image of product must not be empty!')
            return
        }

        console.log(newProductInfo)
        // return
        try {
            let data = newProductInfo
            
            let result = await productService.addNewProduct(data)
            console.log(result)
            if (result && result.errCode === 0) {
                setNewProductInfo({
                    name: '',
                    price: '',
                    image: ''
                })
                toast.success(result.errMsg)
                getAllProduct()
                setaddProductInfoMode(false)
            }
            if (result && result.errCode !== 0) {
                toast.error(result.errMsg)
            }
            if (!result) {
                toast.error('Something wrong!')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something wrong!')
        }
    }

    const handleCloseAddQuantityModal = () => {
        setAddQuantityMode(false)
    }

    const handleCloseAddNewProductInfoModal = () => {
        setaddProductInfoMode(false)
    }

    const handleCloseEditProductInfoModal = () => {
        setEditProductInfoMode(false)
    }

    const handleShowDeleteProductModal = (id) => {
        setProductIdToDelete(id)
        setDeleteProductMode(true)
    }

    const handleCloseDeleteProductModal = () => {
        setDeleteProductMode(false)
    }

    const handleDeleteProduct = async() => {
        try {
            let data = {id: productIdToDelete}
            let result = await productService.deleteProduct(data)
            if (result && result.errCode === 0) {
                setProductIdToDelete()
                getAllProduct()
                toast.success(result.errMsg)
                setDeleteProductMode(false)
            }
            if (result && result.errCode !== 0) {
                toast.error(result.errMsg)
            }
            if (!result) {
                toast.error('Something wrong!')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something wrong!')
        }
    }

    const handleShowAddProductInfoModal = (id) => {
        // setEditProductInfo({
        //     id 
        // })
        setaddProductInfoMode(true)
    }

    const handleShowEditProdutcModal = (item) => {
        console.log(item)
        setEditProductInfo({
            ...item 
        })
        setEditProductInfoMode(true)
    }

    const handleShowAddQuantityModal = (id) => {
        setEditProductInfo({
            id 
        })
        setAddQuantityMode(true)
    }
    const handleChangeAddValue = (e) => {
        if (!Validate.ValidateOnlyNumbers(e.target.value)) return
        setEditProductInfo({
            ...editProductInfo,
            addValue: e.target.value})
    }

    const handleClickSaveAddQuantity = async () => {
        if(!editProductInfo.addValue) {
            toast.error('Please enter number of products you want to add!')
            return
        }
        try {
            let data = {
                productId: editProductInfo.id,
                quantity: editProductInfo.addValue
            }
            let result = await productService.addQuantityToInventory(data)
            if (result && result.errCode === 0) {
                setAddValue(addValue.map((item) => ''))
                getAllProduct()
                toast.success(result.errMsg)
                setAddQuantityMode(false)
            }
            if (result && result.errCode !== 0) {
                toast.error(result.errMsg)
            }
            if (!result) {
                toast.error('Something wrong!')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something wrong!')
        }
    }

     const handleClickSaveEditedProductInfo = async () => {
        console.log(editProductInfo)
        if (!(editProductInfo.name)) {
            toast.error('Name of product must not be empty!')
            return
        }
        if (!Validate.ValidateNormalLetter(editProductInfo.name)) {
            toast.error('Name of product must contain normal letters!')
            return
        }
        if (!(editProductInfo.price)) {
            toast.error('Price of product must not be empty!')
            return
        }
        if (!(editProductInfo.image)) {
            toast.error('Image of product must not be empty!')
            return
        }
        try {
            let data = {
                ...editProductInfo
            }
            let result = await productService.updateProductInfo(data)
            if (result && result.errCode === 0) {
                setEditProductInfo({})
                getAllProduct()
                toast.success(result.errMsg)
                setEditProductInfoMode(false)
            }
            if (result && result.errCode !== 0) {
                toast.error(result.errMsg)
            }
            if (!result) {
                toast.error('Something wrong!')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something wrong!')
        }
    }

    return (
        
        <div className='my-store-page'>
            {console.log(editProductInfo)}
            <TitlePage titleName='Manage for Seller' />
            <div className="container mt-4">
                <h3>My products list</h3>
                <div className="row">
                    <div className="col-12 ">
                        <Button className='float-right' variant="outline-success" onClick={()=>{handleShowAddProductInfoModal()}}>
                            <i className="fas fa-plus"></i> Add New
                        </Button></div>
                </div>
                <div className="product-list-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Unit Price</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productList && productList.length > 0 && productList.map((item, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><img src={item.image} alt={item.name} /></td>
                                    <td className='name'>{item.name}</td>
                                    <td>{item.price} $</td>
                                    <td>{item.total}</td>
                                    <td className='actions'>
                                    <Button variant="outline-success" onClick={()=>{handleShowAddQuantityModal(item.id)}}>
                                        <i className="fas fa-plus"></i> Add Quantity
                                    </Button>
                                    <Button variant="outline-warning" onClick={()=>{handleShowEditProdutcModal(item)}}>
                                        <i className="fas fa-edit"></i> Edit
                                    </Button>
                                    <Button variant="outline-danger" onClick={()=>{handleShowDeleteProductModal(item.id)}}>
                                        <i className="fas fa-trash"></i> Delete
                                    </Button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* start add quantity modal */}
            <Modal show={addQuantityMode} onHide={handleCloseAddQuantityModal}>
                <Modal.Header closeButton>
                <Modal.Title>Add Quantity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <InputGroup className="mb-3" >
                    <InputGroup.Text id="inputGroup-sizing-default">
                        Enter quantity
                    </InputGroup.Text>
                    <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={editProductInfo && editProductInfo.addValue || ''}
                    onChange={handleChangeAddValue}
                    />
                </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddQuantityModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClickSaveAddQuantity}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            {/* end add quantity modal */}
            {/* start add new product info modal */}
            <Modal show={addProductInfoMode} onHide={handleCloseAddNewProductInfoModal}>
                <Modal.Header closeButton>
                <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <InputGroup className="mb-3" >
                    <InputGroup.Text id="inputGroup-sizing-default">
                        Name
                    </InputGroup.Text>
                    <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={newProductInfo.name}
                    onChange={(e) => { handleChangeInput(e, 'name') }}
                    />
                </InputGroup>
                <InputGroup className="mb-3" >
                    <InputGroup.Text id="inputGroup-sizing-default">
                        Price
                    </InputGroup.Text>
                    <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={newProductInfo.price}
                    onChange={(e) => { handleChangeInput(e, 'price') }}
                    />
                </InputGroup>
                <InputGroup className="mb-3" >
                    <InputGroup.Text id="inputGroup-sizing-default">
                        Type
                    </InputGroup.Text>
                    <Form.Select aria-label=""
                    value={newProductInfo.type}
                    onChange={(e) => { handleChangeInput(e, 'type') }}
                    >
                        <option selected disabled hidden>Please choose type of products</option>
                        <option value="vegetable">Vegetable</option>
                        <option value="fruit">Fruit</option>
                        <option value="meat">Meat</option>
                        <option value="fastfood">Fast Food</option>
                    </Form.Select>
                </InputGroup>
                <InputGroup className="mb-3" >
                    <InputGroup.Text id="inputGroup-sizing-default">
                        Image url
                    </InputGroup.Text>
                    <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={newProductInfo.image}
                    onChange={(e) => { handleChangeInput(e, 'image') }}
                    />
                </InputGroup>
                <Form.Group className="mb-3">
                    <Form.Label>Summary</Form.Label>
                    <Form.Control as="textarea" rows={3} 
                    value={newProductInfo.summary}
                    onChange={(e)=>{ handleChangeInput(e, 'summary')}}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} 
                    value={newProductInfo.detailsDescription}
                    onChange={(e)=>{ handleChangeInput(e, 'detailsDescription')}}
                    />
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddNewProductInfoModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClickAddNewProduct}>
                    Add
                </Button>
                </Modal.Footer>
            </Modal>
            {/* end add new product info modal */}
            {/* start edit product info modal */}
            <Modal show={editProductInfoMode} onHide={handleCloseEditProductInfoModal}>
                <Modal.Header closeButton>
                <Modal.Title>Edit product info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3" >
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Name
                        </InputGroup.Text>
                        <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={editProductInfo.name}
                        onChange={(e) => { handleChangeInputEditMode(e, 'name') }}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3" >
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Price
                        </InputGroup.Text>
                        <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={editProductInfo.price}
                        onChange={(e) => { handleChangeInputEditMode(e, 'price') }}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3" >
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Type
                        </InputGroup.Text>
                        <Form.Select aria-label=""
                        value={editProductInfo.type}
                        onChange={(e) => { handleChangeInputEditMode(e, 'type') }}
                        >
                            <option selected disabled hidden>Please choose type of products</option>
                            <option value="vegetable">Vegetable</option>
                            <option value="fruit">Fruit</option>
                            <option value="meat">Meat</option>
                            <option value="fastfood">Fast Food</option>
                        </Form.Select>
                    </InputGroup>
                    <InputGroup className="mb-3" >
                        <InputGroup.Text id="inputGroup-sizing-default">
                            Image url
                        </InputGroup.Text>
                        <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={editProductInfo.image}
                        onChange={(e) => { handleChangeInputEditMode(e, 'image') }}
                        />
                    </InputGroup>
                    <Form.Group className="mb-3">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control as="textarea" rows={3} 
                        value={editProductInfo.summary}
                        onChange={(e)=>{ handleChangeInputEditMode(e, 'summary')}}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={5} 
                        value={editProductInfo.detailsDescription}
                        onChange={(e)=>{ handleChangeInputEditMode(e, 'detailsDescription')}}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditProductInfoModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClickSaveEditedProductInfo}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            {/* end edit product info modal */}
            {/* start confirm delete modal */}
            <Modal show={deleteProductMode} onHide={handleCloseDeleteProductModal}>
                <Modal.Header closeButton>
                <Modal.Title>Add Quantity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure to delete this product from your store? This can be undone!</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeleteProductModal}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteProduct}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
            {/* end confirm delete modal */}
        </div>
    )
}
