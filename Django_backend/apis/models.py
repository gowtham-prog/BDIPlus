from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from django.utils import timezone


def ten_digit_unique_id():
    return str(uuid.uuid4().int)[-1:-11:-1]


class TenDigitPK(models.Model):
    id = models.CharField(
        max_length=10,
        primary_key=True,
        default=ten_digit_unique_id,
        editable=False,
    )
    created_on = models.DateTimeField(
        'Date and Time of creation',
        default=timezone.now,
    )

    class Meta:
        abstract = True
        ordering = ['-created_on']


class User(TenDigitPK, AbstractUser):

    def __str__(self):
        return f"{self.id} - {self.username}"


class Task(TenDigitPK):
    title = models.CharField(max_length=100)
    description = models.TextField()
    created_by = models.ForeignKey(
        User, related_name="created_tasks", on_delete=models.CASCADE, null=False, blank=False)
    due_date = models.DateTimeField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, null=False, blank=False, default="pending", choices=(
        ("pending", "Pending"), ("running", "Running"), ("completed", "Completed")))
    priority = models.CharField(max_length=20, null=False, blank=False, default="low", choices=(
        ("low", "Low"), ("medium", "Medium"), ("high", "High")))

    def __str__(self):
        return f"{self.id} - {self.title} created on {self.created_on} by {self.created_by}"
