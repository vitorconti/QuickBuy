using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Entidades;
using System;

namespace QuickBuy.Web.Controllers
{
    public class UsuarioController : Controller
    {
        [HttpPost]
        public ActionResult Post()
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(""+ ex.Message);
            }
        }
        [HttpPost("VerificaUsuario")]
        public ActionResult VerificaUsuario([FromBody] Usuario usuario)
        {
            try
            {
                if(usuario.Email== "teste@teste.com" && usuario.Senha== "123")
                { 
                    //Nessa linha aqui, alem de retornar o Ok(), também é retornado o usuário convertido de volta para o json
                    return Ok(usuario); 
                }
                return BadRequest("Usuário ou senha inválido");
            }
            catch (Exception ex)
            {

                return BadRequest("" + ex.Message);
            }
        }
    }
}
