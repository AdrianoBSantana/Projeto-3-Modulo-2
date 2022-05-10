import { connection } from '../database/connection.js'
import { herois } from '../model/herois.js'

let message = "";
let type = "";

export const getIndex = async (req, res) => {
    try {
        setTimeout(() => {
            message = ''
            type = ''
        }, 1000)
        const listHerois = await herois.findAll({order: [['id', 'ASC']]})
        console.log(listHerois)
        res.render('index.ejs', {
            listHerois,
            message,
            type
        })
    } catch(error) {
        res.send(error.message)
    }
}

export const getDetalhes = async (req, res) => {
    try {
        
        const heroisDetalhes = await herois.findByPk(req.params.id)
        res.render('detalhes.ejs', {
            heroisDetalhes
        })
    }
    catch(error){
        res.send(error.message)
    }
}
export const getDeletar = async (req, res) => {
    try {
        
        await herois.destroy({
            where: {
                id: req.params.id
            }
        })

       message = 'Herói excluído com sucesso!';
        type = 'success'; 
        res.redirect('/')
    } catch (error) {
        res.send(error.message)
    }
}

export const getCriar = (req, res) => {
    try {
        res.render('criar.ejs', {
            message,
            type
        })
    }
    catch(error) {
        res.send(error.message)
    }

}

export const postCriar = async (req, res) => {
    const { nome,
        identidade,
        genero,
        criadores,
        img } = req.body
        let toggle = false
    try {
      
        if(!nome || !identidade || !genero || !criadores || !img ){
            message = 'Todos os os campos são necessários!';
            type = 'danger'; 
            res.render('criar.ejs')
        } else {
            await herois.create({nome,
                identidade,
                genero,
                criadores,
                img})
                message = 'Novo Herói criado com sucesso!';
                type = 'success';   
                res.redirect('/')
                }
    }
    catch(error){
        res.send(error.message)
    }
}

export const getEditar = async (req, res) => {
    try {
        const heroiAtual = await herois.findByPk(req.params.id)
        res.render('editar.ejs', {
            heroiAtual,message,
            type
        })
    } catch (error) {
        res.send(error.message)
    }
}

export const postEditar = async (req, res) => {
    try {
        const {
            nome,
            identidade,
            genero,
            criadores,
            img
        } = req.body
        await herois.update({
            nome: nome,
            identidade:identidade,
            genero:genero,
            criadores:criadores,
            img:img,
        }, {
            where: {
                id: req.params.id
            }
        })
       
        message = 'Herói editado com sucesso!';
        type = 'success'; 
        res.redirect('/')
    } catch (error) {
        res.send(error.message)
    }
}