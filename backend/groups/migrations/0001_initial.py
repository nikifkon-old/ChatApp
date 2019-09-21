# Generated by Django 2.2.3 on 2019-08-12 11:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChatGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Name')),
                ('slug', models.SlugField(max_length=100, unique=True, verbose_name='Unique name')),
                ('img', models.ImageField(blank=True, null=True, upload_to='groups/', verbose_name='Image')),
                ('description', models.TextField(blank=True, max_length=1000, null=True, verbose_name='Description')),
            ],
            options={
                'verbose_name': 'Group',
                'verbose_name_plural': 'Groups',
            },
        ),
        migrations.CreateModel(
            name='Membership',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(choices=[('A', 'Admin'), ('M', 'Moderator'), ('M', 'Member')], max_length=1, verbose_name='Role in Group')),
                ('date_joined', models.DateField(auto_now_add=True, verbose_name='Date of joined')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='groups.ChatGroup')),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profiles.Profile')),
            ],
            options={
                'verbose_name': 'Membership',
                'verbose_name_plural': 'Memberships',
                'unique_together': {('person', 'group')},
            },
        ),
        migrations.AddField(
            model_name='chatgroup',
            name='members',
            field=models.ManyToManyField(related_name='groups', through='groups.Membership', to='profiles.Profile'),
        ),
    ]