# Generated migration to add participant fields

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tours_registrations', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tourregistration',
            name='participant_city',
            field=models.CharField(max_length=100, default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tourregistration',
            name='participant_birth_date',
            field=models.DateField(default='2000-01-01'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tourregistration',
            name='participant_email',
            field=models.EmailField(default='', max_length=254),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tourregistration',
            name='participant_first_name',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tourregistration',
            name='participant_last_name',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tourregistration',
            name='participant_phone',
            field=models.CharField(default='', max_length=15),
            preserve_default=False,
        ),
    ]

