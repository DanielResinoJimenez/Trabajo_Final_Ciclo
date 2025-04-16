import React, { useEffect } from 'react'
import usePanelControl from '../../../services/hooks/usePanelControl'
import ProductosAdminCard from './ProductosAdminCard'
import { useProductosContext } from '../../../services/hooks/productosContext'

const ProductosAdmin = () => {

  const { productos, loading, error, getProductos } = useProductosContext();

  useEffect(() => {
    getProductos();
  }, [])

  return (
    <div>
      <h1>Productos Admin</h1>
      {

      }
    </div>
  )
}

export default ProductosAdmin