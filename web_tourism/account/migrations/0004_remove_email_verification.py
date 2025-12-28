# Generated migration to remove email verification fields

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_customuser_email_verification_code_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='email_verified',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='email_verification_code',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='email_verification_code_created',
        ),
    ]

