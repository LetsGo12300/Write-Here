# Generated by Django 4.0.1 on 2022-01-29 07:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0006_deletednote'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='deleted',
            field=models.CharField(default=False, max_length=64),
        ),
        migrations.DeleteModel(
            name='DeletedNote',
        ),
    ]
