import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'

// Async thunk to fetch products from a public API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await fetch('https://fakestoreapi.com/products?limit=20')
  if (!res.ok) throw new Error('Failed to fetch products')
  const data = await res.json()
  // Ensure consistent shape
  return data.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    description: p.description,
    category: p.category,
    image: p.image
  }))
})

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    selectedProduct: null
  },
  reducers: {
    selectProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
    addProduct: {
      reducer: (state, action) => {
        // Add new product at the top
        state.items.unshift(action.payload)
      },
      prepare: ({ title, price, description, category, image }) => {
        return {
          payload: {
            id: nanoid(),
            title: title.trim() || 'Untitled',
            price: Number(price) || 0,
            description: description?.trim() || 'No description',
            category: category?.trim() || 'misc',
            image: image?.trim() || 'https://via.placeholder.com/300?text=New+Product'
          }
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Error fetching products'
      })
  }
})

export const { selectProduct, addProduct } = productsSlice.actions
export default productsSlice.reducer
