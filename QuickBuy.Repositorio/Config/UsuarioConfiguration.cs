using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.Repositorio.Config
{
    public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            
            
            //id 
            builder.HasKey(u => u.Id);
            //has key é o metodo que define a chave primária
            //Builder usa o padrao Fluent
            //Email
            builder
                .Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(50);
            //Senha
            builder
                .Property(u => u.Senha)
                .IsRequired()
                .HasMaxLength(400);
            //Nome
            builder
                .Property(u => u.Nome)
                .IsRequired()
                .HasMaxLength(50)
                .HasMaxLength(50);
            builder
                .Property(u => u.SobreNome)
                .IsRequired()
                .HasMaxLength(50);

            builder
                .HasMany(u => u.Pedidos)
                .WithOne(p => p.Usuario) ;
                

        }
    }
}
