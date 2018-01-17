export class Constantes{    

     public static CALENDAR={
            firstDayOfWeek: 0,
            dayNames: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"],
            dayNamesShort: ["Dom", "Lun", "Mar", "Mier", "Jue", "Vier", "Sab"],
            dayNamesMin: ["Do","Lu","Ma","Mie","Ju","vi","Sa"],
            monthNames: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre" ],
            monthNamesShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dec" ]
      
     }
     public static imagen_serv:string="https:/virtualkinder.com/subir/sube.php";
     public static BASE_URL:string ="https://virtualkinder.com/rest/index.php/";
    
     public static getHora(dia:string) {
        var d = new Date(dia);

        let yyyy: string = d.getFullYear().toString();
        let mm: string = (d.getMonth() + 101).toString().slice(-2);
        let dd: string = (d.getDate() + 100).toString().slice(-2);
       
        return yyyy + '-' + mm + '-' + dd + ' ' ;
    }
    public static getFecha() {
        var d = new Date();

        let yyyy: string = d.getFullYear().toString();
        let mm: string = (d.getMonth() + 101).toString().slice(-2);
        let dd: string = (d.getDate() + 100).toString().slice(-2);
       
        return yyyy + '-' + mm + '-' + dd + ' ' ;
    }
    public static getFechaHora() {
        var d = new Date();

        let yyyy: string = d.getFullYear().toString();
        let mm: string = (d.getMonth() + 101).toString().slice(-2);
        let dd: string = (d.getDate() + 100).toString().slice(-2);
        var h = this.addZero(d.getHours());
        var m = this.addZero(d.getMinutes());
        var s = this.addZero(d.getSeconds());
        return yyyy + '-' + mm + '-' + dd + ' ' + h + ":" + m + ":" + s;
    }
    public static addZero(i: number): string {
        let response = i.toString();
        if (i < 10) {
            response = "0" + i;
        }
        return response;
    }






///constantes para probar los drag and drop
public static INFANTES = [
    {
        // 12','13','14','15','16','17'
        nombre_completo: "infante12",
        id: "1",
        id_sala: 1,
        foto: 'https://www.google.com.ar/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiC8tX2-__VAhXJ-lQKHdUoBy0QjRwIBw&url=http%3A%2F%2Fwww.planetamama.com.ar%2Fnota%2Fadaptaci%25C3%25B3n-al-jard%25C3%25ADn-de-infantes%3Fpage%3Dfull&psig=AFQjCNHaHp6eF07wK3xe_nb4GEbXd3a9Ew&ust=1504217212148588'
        , 
        estado: "ausente"
    },
    {
        nombre_completo: "infante13",
        id: "2",
        id_sala: 1,
        foto: 'https://www.google.com.ar/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjt0JaE_P_VAhWJg1QKHbNwB3gQjRwIBw&url=http%3A%2F%2Fes.123rf.com%2Fphoto_37204924_chico-inteligente-divertida-en-los-vidrios-de-lectura-de-libros-en-el-jardin-de-infantes.html&psig=AFQjCNHaHp6eF07wK3xe_nb4GEbXd3a9Ew&ust=1504217212148588'
        , estado: "ausente"
    },
    {
        nombre_completo: "infante14",
        id: "3",
        id_sala: 1,
        foto: 'https://www.google.com.ar/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwi77fya_P_VAhXGwVQKHQcHBn8QjRwIBw&url=http%3A%2F%2Fwww.lanacion.com.ar%2F1988773-equiparan-con-tabletas-y-un-kit-tecnologico-a-los-jardines-de-infantes-de-la-ciudad&psig=AFQjCNHaHp6eF07wK3xe_nb4GEbXd3a9Ew&ust=1504217212148588'
        , estado: "ausente"
    }
  

]
public static Maestras = [
    {
        // 12','13','14','15','16','17'
        nombre_completo: "Maestra 1",
        id: "1",
        id_sala: 1,
        foto: 'https://www.google.com.ar/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiC8tX2-__VAhXJ-lQKHdUoBy0QjRwIBw&url=http%3A%2F%2Fwww.planetamama.com.ar%2Fnota%2Fadaptaci%25C3%25B3n-al-jard%25C3%25ADn-de-infantes%3Fpage%3Dfull&psig=AFQjCNHaHp6eF07wK3xe_nb4GEbXd3a9Ew&ust=1504217212148588'
        , 
        estado: "ausente"
    },
    {
        nombre_completo: "Maestra 2",
        id: "2",
        id_sala: 1,
        foto: 'https://www.google.com.ar/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjt0JaE_P_VAhWJg1QKHbNwB3gQjRwIBw&url=http%3A%2F%2Fes.123rf.com%2Fphoto_37204924_chico-inteligente-divertida-en-los-vidrios-de-lectura-de-libros-en-el-jardin-de-infantes.html&psig=AFQjCNHaHp6eF07wK3xe_nb4GEbXd3a9Ew&ust=1504217212148588'
        , estado: "ausente"
    },
    {
        nombre_completo: "Maestra 3",
        id: "3",
        id_sala: 1,
        foto: 'https://www.google.com.ar/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwi77fya_P_VAhXGwVQKHQcHBn8QjRwIBw&url=http%3A%2F%2Fwww.lanacion.com.ar%2F1988773-equiparan-con-tabletas-y-un-kit-tecnologico-a-los-jardines-de-infantes-de-la-ciudad&psig=AFQjCNHaHp6eF07wK3xe_nb4GEbXd3a9Ew&ust=1504217212148588'
        , estado: "ausente"
    },
    {
        // 12','13','14','15','16','17'
        nombre_completo: "Maestra 3",
        id: "1",
        id_sala: 1,
        foto: 'https://www.google.com.ar/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwiC8tX2-__VAhXJ-lQKHdUoBy0QjRwIBw&url=http%3A%2F%2Fwww.planetamama.com.ar%2Fnota%2Fadaptaci%25C3%25B3n-al-jard%25C3%25ADn-de-infantes%3Fpage%3Dfull&psig=AFQjCNHaHp6eF07wK3xe_nb4GEbXd3a9Ew&ust=1504217212148588'
        , 
        estado: "ausente"
    },
    {
        nombre_completo: "Maestra 4",
        id: "2",
        id_sala: 1,
        foto: 'https://www.google.com.ar/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjt0JaE_P_VAhWJg1QKHbNwB3gQjRwIBw&url=http%3A%2F%2Fes.123rf.com%2Fphoto_37204924_chico-inteligente-divertida-en-los-vidrios-de-lectura-de-libros-en-el-jardin-de-infantes.html&psig=AFQjCNHaHp6eF07wK3xe_nb4GEbXd3a9Ew&ust=1504217212148588'
        , estado: "ausente"
    }
  

]


    }