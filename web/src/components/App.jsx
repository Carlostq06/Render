import '../css/App.css'
function App() {
  //javascript
  return (
    <>
      <h1>Titulo de la web</h1>
      <a href="http://localhost:5000/api/plantilla" target='_blank'>Ir al motor de la plantilla</a>
    </>
  )
}

export default App
// 1 endpoint q reciba el id del cliente
// y cuando se ejecute vamoa a renderizar una plantilla de ejs con los datos del cliente