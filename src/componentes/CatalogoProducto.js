import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

function CatalogoProducto({ onSubmit }) {
  const handleSubmit = (item) => {
    setCatalogoList([...catalogoList, item]); //
  };

  const [numeroAzar, setNumeroAzar] = useState(3000);

  const generadorNumeroAzar = () => {
    const ramdonNumber = Math.floor(Math.random() * 10000);
    setNumeroAzar(ramdonNumber);
  };

  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
      console.log(response.data.results);
      setPokemon(response.data.results.slice(0, 6));
    });
  }, []);

  const [catalogoList, setCatalogoList] = useState([]);

  const [inputCatalogoProducto, setInputCatalogoProducto] = useState({
    nombreComercial: "",
    precioVenta: "",
    fotoProducto: [null],
  });

  return (
    <div>
      <h2 className="text-center">Catalogo de los Productos</h2>

      {/* ACA VAMOS A PONER LA API DE POKEMONES */}
      <div className="container">
        <div className="row">
          {pokemon?.map((item, index) => {
            return (
              <div key={index} className="col-4">
                <Card
                  name="nombreComercial"
                  title={item.name}
                  subTitle={"Venta al precio de: " + [numeroAzar]}
                  footer={
                    <>
                      <Button
                        label="Agregar"
                        icon="pi pi-check"
                        onClick={() => handleSubmit(item)}
                      />
                      <Button
                        label="Cancel"
                        severity="secondary"
                        icon="pi pi-times"
                        style={{ marginLeft: "0.5em" }}
                      />
                    </>
                  }
                  header={
                    <img
                      className="w-100"
                      src={item?.url}
                      type="file"
                      value={inputCatalogoProducto.fotoProducto}
                    ></img>
                  }
                  className="md:w-25rem mt-4"
                >
                  <p className="mt-0">{}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      <hr />

      <div className="card">
        <DataTable value={catalogoList} tableStyle={{ minWidth: "50rem" }}>
          <Column field="nombreComercial" header="NombreComercial"></Column>
          <Column field="precioVenta" header="PrecioVenta"></Column>
          <Column field="fotoProducto" header="FotoProducto"></Column>
        </DataTable>
      </div>
      <div className="row">
        {catalogoList.map((value, index) => (
          <div key={index} className="card col-lg-4 col-sm-12 ">
            <img
              src={value.fotoProducto}
              alt={"fotoProducto " + value.nombreComercial}
            />
            <div className="row">
              <div className="col-4">
                <span>{value.nombreComercial}</span>
              </div>
              <div className="col-4">
                <span>${value.precioVenta}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatalogoProducto;
