﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OrderPlacementAPI.Models;

namespace OrderPlacementAPI.Migrations
{
    [DbContext(typeof(OrderPlacementContext))]
    [Migration("20210926102143_MainMigration")]
    partial class MainMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.10")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("OrderPlacementAPI.Models.Address", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Street")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ZipCode")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Address");
                });

            modelBuilder.Entity("OrderPlacementAPI.Models.Customer", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Firstname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Lastname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Customer");
                });

            modelBuilder.Entity("OrderPlacementAPI.Models.JobService", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ServiceName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("JobService");
                });

            modelBuilder.Entity("OrderPlacementAPI.Models.Order", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("CustomerId")
                        .HasColumnType("bigint");

                    b.Property<long?>("FromAddressId")
                        .HasColumnType("bigint");

                    b.Property<string>("OrderNote")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ServiceDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<long?>("ToAddressId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("FromAddressId");

                    b.HasIndex("ToAddressId");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("OrderPlacementAPI.Models.OrderJobService", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long>("JobServiceId")
                        .HasColumnType("bigint");

                    b.Property<long>("OrderId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("JobServiceId");

                    b.HasIndex("OrderId");

                    b.ToTable("OrderJobService");
                });

            modelBuilder.Entity("OrderPlacementAPI.Models.Order", b =>
                {
                    b.HasOne("OrderPlacementAPI.Models.Customer", "Customer")
                        .WithMany()
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("OrderPlacementAPI.Models.Address", "FromAddress")
                        .WithMany()
                        .HasForeignKey("FromAddressId");

                    b.HasOne("OrderPlacementAPI.Models.Address", "ToAddress")
                        .WithMany()
                        .HasForeignKey("ToAddressId");

                    b.Navigation("Customer");

                    b.Navigation("FromAddress");

                    b.Navigation("ToAddress");
                });

            modelBuilder.Entity("OrderPlacementAPI.Models.OrderJobService", b =>
                {
                    b.HasOne("OrderPlacementAPI.Models.JobService", "JobService")
                        .WithMany()
                        .HasForeignKey("JobServiceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("OrderPlacementAPI.Models.Order", "Order")
                        .WithMany()
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("JobService");

                    b.Navigation("Order");
                });
#pragma warning restore 612, 618
        }
    }
}