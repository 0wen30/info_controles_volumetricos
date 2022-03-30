const fs = require('fs');

const convert = require('xml-js');

const manipular = ({PRODUCTO}) => {

    const { CONTROLDEEXISTENCIAS,RECEPCIONES,ENTREGAS } = PRODUCTO.REPORTEDEVOLUMENMENSUAL;
    const VolumenExistenciasMes = CONTROLDEEXISTENCIAS.VolumenExistenciasMes.ValorNumerico._text;
    const FechaYHoraEstaMedicionMes = CONTROLDEEXISTENCIAS.FechaYHoraEstaMedicionMes._text;

    const TotalRecepcionesMes = RECEPCIONES.TotalRecepcionesMes._text;
    const SumaVolumenRecepcionMes = RECEPCIONES.SumaVolumenRecepcionMes.ValorNumerico._text;
    const TotalDocumentosMes = RECEPCIONES.TotalDocumentosMes._text;
    const ImporteTotalRecepcionesMensual = RECEPCIONES.ImporteTotalRecepcionesMensual._text;
    const arrayRecepciones = RECEPCIONES.Complemento.Complemento_Expendio.NACIONAL;

    const TotalEntregasMes = ENTREGAS.TotalEntregasMes._text;
    const SumaVolumenEntregadoMes = ENTREGAS.SumaVolumenEntregadoMes.ValorNumerico._text;
    const TotalDocumentosEntregasMes = ENTREGAS.TotalDocumentosMes._text;
    const ImporteTotalEntregasMes = ENTREGAS.ImporteTotalEntregasMes._text;
    const arrayEntregas = ENTREGAS.Complemento.Complemento_Expendio.NACIONAL;

    let texto = "";

    texto += "VolumenExistenciasMes;" + VolumenExistenciasMes + 
            "\nFechaYHoraEstaMedicionMes;" + FechaYHoraEstaMedicionMes + 
            "\nTotalRecepcionesMes;" + TotalRecepcionesMes + 
            "\nSumaVolumenRecepcionMes;" + SumaVolumenRecepcionMes +
            "\nTotalDocumentosMes;" + TotalDocumentosMes + 
            "\nImporteTotalRecepcionesMensual;" + ImporteTotalRecepcionesMensual + 
            "\nTotalEntregasMes;"+ TotalEntregasMes + 
            "\nSumaVolumenEntregadoMes;"+ SumaVolumenEntregadoMes + 
            "\nTotalDocumentosEntregasMes;" + TotalDocumentosEntregasMes + 
            "\nImporteTotalEntregasMes;" + ImporteTotalEntregasMes;
    
    fs.writeFile('./ficheros_creados/resumen_total.txt', texto, error => {
    if (error)
        console.log(error);
    else
        console.log('El archivo fue creado');
    });

    texto = "";
    arrayRecepciones.map(compra=>{
        texto   += compra.CFDIs.FechaYHoraTransaccion._text + ";"
                + compra.CFDIs.TipoCFDI._text + ";"
                + compra.CFDIs.CFDI._text + ";"
                + compra.CFDIs.PrecioCompra._text + ";"
                + compra.CFDIs.VolumenDocumentado.ValorNumerico._text + "\n";
    })
    fs.writeFile('./ficheros_creados/compras_detalladas.txt', texto, error => {
    if (error)
        console.log(error);
    else
        console.log('El archivo fue creado');
    });

    texto = "";
    arrayEntregas.map(ventas=>{
        texto   += ventas.CFDIs.CFDI._text + ";"
                + ventas.CFDIs.PrecioDeVentaAlPublico._text + ";"
                + ventas.CFDIs.TipoCFDI._text + ";"
                + ventas.CFDIs.PrecioCompra._text + ";"
                + ventas.CFDIs.PrecioVenta._text + ";"
                + ventas.CFDIs.FechaYHoraTransaccion._text + ";"
                + ventas.CFDIs.VolumenDocumentado.ValorNumerico._text + "\n";
    })
    fs.writeFile('./ficheros_creados/ventas_detalladas.txt', texto, error => {
    if (error)
        console.log(error);
    else
        console.log('El archivo fue creado');
    });

}

fs.readFile('./producto.xml', (error, datos) => {
    if (error){
        console.log(error);
    }else {
        const result = convert.xml2js(datos, { compact: true });
        manipular(result)
    }
});
