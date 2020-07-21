
using QuickBuy.Dominio.Contratos;
using QuickBuy.Repositorio.Contexto;
using System.Collections.Generic;
using System.Linq;

namespace QuickBuy.Repositorio.Repositorios
{
    public class BaseRepositorio<TEntity> : IBaseRepositorio<TEntity> where TEntity : class
    {
        private readonly QuickBuyContexto _quickBuyContexto;
       
        public BaseRepositorio(QuickBuyContexto quickBuyContexto)
        {
            _quickBuyContexto = quickBuyContexto;
        }
        public void Adicionar(TEntity entity)
        {
            _quickBuyContexto.Set<TEntity>().Add(entity);
        }

        public void Atualizar(TEntity entity)
        {
            throw new System.NotImplementedException();
        }


        public void IDisposable(TEntity entity)
        {
            throw new System.NotImplementedException();
        }

        public TEntity ObterPorId(int id)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<TEntity> ObterTodos()
        {
            return _quickBuyContexto.Set<TEntity>().ToList();
        }

        public void Remover(TEntity entity)
        {
            throw new System.NotImplementedException();
        }
        public void Dispose()
        {
            throw new System.NotImplementedException();
        }
    }


}
