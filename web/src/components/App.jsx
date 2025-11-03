import '../css/App.css'
function App() {
  fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/client`)
  .then(res => res.json())
  .then(data => console.log(data))

  return (
    <>
      <h1>Titulo de la web</h1>
      <a href={`${import.meta.env.VITE_APP_BASE_URL}/api/plantilla`} target='_blank'>Ir al motor de la plantilla</a>
    </>
  )
}

export default App
// 1 endpoint q reciba el id del cliente
// y cuando se ejecute vamoa a renderizar una plantilla de ejs con los datos del cliente