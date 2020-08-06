namespace QuickBuy.Dominio.Entidades
{
    public class Produto : Entidade
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
        public string NomeArquivo { get; set; }
        public override void Validate()
        {
            if (string.IsNullOrEmpty(Nome))
                AdicionarCritica("Nome do produto não pode ser vazio ");
            if (string.IsNullOrEmpty(Descricao))
                AdicionarCritica("Descrição do produto não pode ser vazia ");
            if (Preco.Equals(""))
                AdicionarCritica("Preço do produto não pode ser vazio ");

        }
    }
}
