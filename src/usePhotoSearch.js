import { useEffect, useState } from 'react'
import axios from 'axios'

export default function usePhotoSearch(query, pageNumber = 1) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [photos, setPhotos] = useState([])
  const [hasMore, setHasMore] = useState(false)
  // const [method, setMethod] = useState("flickr.photos.getRecent")

  useEffect(() => {
    setPhotos([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel, searchHistory
    let method = query === "" ? "flickr.photos.getRecent" : "flickr.photos.search"
    axios({
      method: 'GET',
      url: 'https://www.flickr.com/services/rest/',
      params: { method: method, api_key: process.env.REACT_APP_API_KEY, page: pageNumber, text: query, format: "json", nojsoncallback: 1 },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      if (query !== "") {
        searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
        searchHistory.push(query)
        searchHistory = [...new Set(searchHistory)]
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
      }
      setPhotos(prevPhotos => {
        return [...new Set([...prevPhotos, ...res.data.photos.photo])]
      })
      setHasMore(res.data.photos.photo.length > 0)
      setLoading(false)
    }).catch(e => {
      console.log(e)
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [query, pageNumber])

  return { loading, error, photos, hasMore }
}
